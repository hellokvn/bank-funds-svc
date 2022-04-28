import { Controller, Inject, OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import { plainToClass } from 'class-transformer';
import { KafkaMessage } from 'kafkajs';
import { FundsReceivedEvent } from '@shared/events';

@Controller()
export class FundsReceivedConsumer implements OnApplicationBootstrap, OnApplicationShutdown {
  @Inject('KAFKA_SERVICE')
  private readonly client: ClientKafka;

  @Inject(EventBus)
  private readonly eventBus: EventBus;

  public onApplicationBootstrap() {
    this.client.subscribeToResponseOf('FundsReceivedEvent');
  }

  public onApplicationShutdown() {
    this.client.close();
  }

  @MessagePattern('FundsReceivedEvent')
  private fundsReceived(@Payload() { value }: KafkaMessage): void {
    const event: FundsReceivedEvent = plainToClass(FundsReceivedEvent, value);

    this.eventBus.publish(event);
  }
}
