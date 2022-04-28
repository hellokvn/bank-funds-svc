import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventSourcingHandler } from 'nestjs-event-sourcing';

import { AccountEventProducer } from '@command/common/producer/account-event.producer';
import { RceiveFundsHandler } from './commands/receive-funds.handler';
import { FundsReceivedHandler } from './events/funds-received.handler';

@Module({
  imports: [CqrsModule],
  providers: [RceiveFundsHandler, FundsReceivedHandler, AccountEventProducer, EventSourcingHandler],
})
export class ReceiveFundsModule {}
