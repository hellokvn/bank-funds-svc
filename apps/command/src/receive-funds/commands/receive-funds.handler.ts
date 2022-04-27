import { Inject, HttpException, HttpStatus } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { EventSourcingHandler } from 'nest-event-sourcing';
import { BankAccountQueryServiceClient, BANK_ACCOUNT_QUERY_SERVICE_NAME } from '@command/common/proto/bank-account-query.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { FindAccountResponse } from '../../common/proto/bank-account-query.pb';
import { AccountAggregate } from '@command/common/aggregates/account.aggregate';
import { ReceiveFundsCommand } from '@shared/commands';

@CommandHandler(ReceiveFundsCommand)
export class RceiveFundsHandler implements ICommandHandler<ReceiveFundsCommand> {
  private accountQSvc: BankAccountQueryServiceClient;

  @Inject(EventSourcingHandler)
  private readonly eventSourcingHandler: EventSourcingHandler<AccountAggregate>;

  @Inject(EventPublisher)
  private readonly publisher: EventPublisher;

  public async execute(command: ReceiveFundsCommand): Promise<any | never> {
    console.log('RceiveFundsHandler excuted GOOD');
    const aggregate: AccountAggregate = await this.eventSourcingHandler.getById(AccountAggregate, command.id);

    this.publisher.mergeObjectContext(aggregate);
    aggregate.receiveFunds(command);

    await this.eventSourcingHandler.save(aggregate);

    aggregate.commit();
  }
}
