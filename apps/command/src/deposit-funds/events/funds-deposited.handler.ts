import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { FundsDepositedEvent } from '@shared/events/funds-deposited.event';
import { AccountEventProducer } from '@command/common/producer/account-event.producer';

@EventsHandler(FundsDepositedEvent)
export class FundsDepositedHandler implements IEventHandler<FundsDepositedEvent> {
  @Inject(AccountEventProducer)
  private readonly eventProducer: AccountEventProducer;

  public handle(event: FundsDepositedEvent): void {
    console.log('FundsDepositedHandler', { event });
    const { constructor }: FundsDepositedEvent = Object.getPrototypeOf(event);

    this.eventProducer.produce(constructor.name, event);
  }
}
