import { Controller, Inject, OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import { plainToClass } from 'class-transformer';
import { KafkaMessage } from 'kafkajs';

import { FundsDepositedEvent } from '@shared/events';

@Controller()
export class FundsDepositedConsumer implements OnApplicationBootstrap, OnApplicationShutdown {
  @Inject('KAFKA_SERVICE')
  private readonly client: ClientKafka;

  @Inject(EventBus)
  private readonly eventBus: EventBus;

  public onApplicationBootstrap() {
    console.log('listen to FundsDepositedEvent');
    this.client.subscribeToResponseOf('FundsDepositedEvent');
  }

  public onApplicationShutdown() {
    this.client.close();
  }

  @MessagePattern('FundsDepositedEvent')
  private fundsDeposited(@Payload() { value }: KafkaMessage): void {
    const event: FundsDepositedEvent = plainToClass(FundsDepositedEvent, value);
    console.log('on FundsDepositedEvent', { event });

    this.eventBus.publish(event);
  }
}
