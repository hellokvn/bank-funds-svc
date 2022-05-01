import { Controller, Inject } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { plainToClass } from 'class-transformer';
import { KafkaMessage } from 'kafkajs';
import { FundsWithdrawnEvent } from '@shared/events';

@Controller()
export class FundsWithdrawnConsumer {
  @Inject(EventBus)
  private readonly eventBus: EventBus;

  @MessagePattern('FundsWithdrawnEvent')
  private fundsWithdrawn(@Payload() { value }: KafkaMessage): void {
    const event: FundsWithdrawnEvent = plainToClass(FundsWithdrawnEvent, value);

    this.eventBus.publish(event);
  }
}
