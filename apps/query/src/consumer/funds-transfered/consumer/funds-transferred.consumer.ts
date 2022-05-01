import { Controller, Inject } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { plainToClass } from 'class-transformer';
import { KafkaMessage } from 'kafkajs';

import { FundsTransferredEvent } from '@shared/events';

@Controller()
export class FundsTransferredConsumer {
  @Inject(EventBus)
  private readonly eventBus: EventBus;

  @MessagePattern('FundsTransferredEvent')
  private fundsTransferred(@Payload() { value }: KafkaMessage): void {
    const event: FundsTransferredEvent = plainToClass(FundsTransferredEvent, value);
    console.log('on FundsTransferredEvent', { event });

    this.eventBus.publish(event);
  }
}
