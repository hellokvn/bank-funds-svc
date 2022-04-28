import { Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { EventSourcingHandler } from 'nestjs-event-sourcing';

import { ReceiveFundsCommand } from '@shared/commands';
import { BankAccountQueryServiceClient } from '@command/common/proto/bank-account-query.pb';
import { AccountAggregate } from '@command/common/aggregates/account.aggregate';

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
