import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { FundsWithdrawnEvent } from '@shared/events/funds-withdrawn.event';
import { AccountEventProducer } from '@command/common/producer/account-event.producer';

@EventsHandler(FundsWithdrawnEvent)
export class FundsWithdrawnHandler implements IEventHandler<FundsWithdrawnEvent> {
  @Inject(AccountEventProducer)
  private readonly eventProducer: AccountEventProducer;

  public handle(event: FundsWithdrawnEvent): void {
    console.log('FundsWithdrawedHandler', { event });
    const { constructor }: FundsWithdrawnEvent = Object.getPrototypeOf(event);

    this.eventProducer.produce(constructor.name, event);
  }
}
