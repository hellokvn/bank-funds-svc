import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { FundsTransferredEvent } from '@shared/events';
import { AccountEventProducer } from '@command/common/producer/account-event.producer';

@EventsHandler(FundsTransferredEvent)
export class FundsTransferredHandler implements IEventHandler<FundsTransferredEvent> {
  @Inject(AccountEventProducer)
  private eventProducer: AccountEventProducer;

  public async handle(event: FundsTransferredEvent) {
    console.log('FundsTransferredHandler', { event });
    const { constructor }: FundsTransferredEvent = Object.getPrototypeOf(event);

    this.eventProducer.produce(constructor.name, event);
  }
}
