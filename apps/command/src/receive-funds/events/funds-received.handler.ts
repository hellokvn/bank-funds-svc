import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { FundsReceivedEvent } from '@shared/events';

import { AccountEventProducer } from '@command/common/producer/account-event.producer';

@EventsHandler(FundsReceivedEvent)
export class FundsReceivedHandler implements IEventHandler<FundsReceivedEvent> {
  @Inject(AccountEventProducer)
  private readonly eventProducer: AccountEventProducer;

  public handle(event: FundsReceivedEvent): void {
    console.log('FundsReceivedEvent', { event });
    const { constructor }: FundsReceivedEvent = Object.getPrototypeOf(event);

    this.eventProducer.produce(constructor.name, event);
  }
}
