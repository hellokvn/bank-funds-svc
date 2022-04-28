import { Controller, Inject, OnApplicationBootstrap, OnApplicationShutdown, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { Client, ClientKafka, EventPattern, MessagePattern, Payload, Transport } from '@nestjs/microservices';
import { plainToClass } from 'class-transformer';
import { KafkaMessage } from 'kafkajs';
import { FundsWithdrawnEvent } from '@shared/events';
import { BANK_FUNDS_QUERY_SERVICE_NAME } from '@query/common/proto/bank-funds-query.pb';

@Controller()
export class FundsWithdrawnConsumer implements OnApplicationBootstrap, OnApplicationShutdown {
  @Inject('KAFKA_SERVICE')
  private readonly client: ClientKafka;

  @Inject(EventBus)
  private readonly eventBus: EventBus;

  public onApplicationBootstrap() {
    this.client.subscribeToResponseOf('FundsWithdrawnEvent');
  }

  public onApplicationShutdown() {
    this.client.close();
  }

  @MessagePattern('FundsWithdrawnEvent')
  private fundsWithdrawn(@Payload() { value }: KafkaMessage): void {
    const event: FundsWithdrawnEvent = plainToClass(FundsWithdrawnEvent, value);

    this.eventBus.publish(event);
  }
}
