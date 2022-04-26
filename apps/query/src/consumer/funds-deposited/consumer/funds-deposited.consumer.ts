import { Controller, Inject, OnApplicationBootstrap, OnApplicationShutdown, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { Client, ClientKafka, EventPattern, MessagePattern, Payload, Transport } from '@nestjs/microservices';
import { plainToClass } from 'class-transformer';
import { KafkaMessage } from 'kafkajs';
import { FundsDepositedEvent } from '@shared/events';
import { BANK_FUNDS_QUERY_SERVICE_NAME } from '@query/common/proto/bank-funds-query.pb';

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
  public fundsDeposited(@Payload() { value }: KafkaMessage): any {
    const event: FundsDepositedEvent = plainToClass(FundsDepositedEvent, value);
    console.log('on FundsDepositedEvent', { event });

    this.eventBus.publish(event);
  }
}
