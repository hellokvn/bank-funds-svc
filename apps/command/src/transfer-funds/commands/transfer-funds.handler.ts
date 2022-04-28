import { Inject, HttpException, HttpStatus } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { ClientGrpc } from '@nestjs/microservices';
import { EventSourcingHandler } from 'nestjs-event-sourcing';
import { firstValueFrom } from 'rxjs';

import { TransferFundsCommand } from '@shared/commands/transfer-funds.command';
import {
  BankAccountQueryServiceClient,
  BANK_ACCOUNT_QUERY_SERVICE_NAME,
  FindAccountResponse,
} from '@command/common/proto/bank-account-query.pb';
import { AccountAggregate } from '@command/common/aggregates/account.aggregate';

@CommandHandler(TransferFundsCommand)
export class TransferFundsHandler implements ICommandHandler<TransferFundsCommand> {
  private accountQSvc: BankAccountQueryServiceClient;

  @Inject(EventSourcingHandler)
  private readonly eventSourcingHandler: EventSourcingHandler<AccountAggregate>;

  @Inject(EventPublisher)
  private readonly publisher: EventPublisher;

  @Inject(BANK_ACCOUNT_QUERY_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit() {
    this.accountQSvc = this.client.getService<BankAccountQueryServiceClient>(BANK_ACCOUNT_QUERY_SERVICE_NAME);
  }

  public async execute(command: TransferFundsCommand): Promise<void | never> {
    let res: FindAccountResponse = await firstValueFrom(this.accountQSvc.findAccount({ id: command.id }));

    if (!res || !res.data) {
      throw new HttpException('Account not found!', HttpStatus.NOT_FOUND);
    }

    res = await firstValueFrom(this.accountQSvc.findAccount({ id: command.getTargetedId() }));

    console.log(command.getTargetedId(), { res });

    if (!res || !res.data) {
      throw new HttpException('Targeted account not found!', HttpStatus.NOT_FOUND);
    }

    const aggregate: AccountAggregate = await this.eventSourcingHandler.getById(AccountAggregate, command.id);

    if (command.getAmount() > aggregate.getBalance()) {
      throw new HttpException('Withdraw declined, insufficient funds!', HttpStatus.CONFLICT);
    }

    this.publisher.mergeObjectContext(aggregate);
    aggregate.transferFunds(command);

    await this.eventSourcingHandler.save(aggregate);

    aggregate.commit();
  }
}
