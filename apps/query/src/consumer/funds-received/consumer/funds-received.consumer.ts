import { Controller, Inject } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { plainToClass } from 'class-transformer';
import { KafkaMessage } from 'kafkajs';
import { FundsReceivedEvent } from '@shared/events';

@Controller()
export class FundsReceivedConsumer {
  @Inject(EventBus)
  private readonly eventBus: EventBus;

  @MessagePattern('FundsReceivedEvent')
  private fundsReceived(@Payload() { value }: KafkaMessage): void {
    const event: FundsReceivedEvent = plainToClass(FundsReceivedEvent, value);

    this.eventBus.publish(event);
  }
}
