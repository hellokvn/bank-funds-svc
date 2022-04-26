import { Controller, Inject, OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import { plainToClass } from 'class-transformer';
import { KafkaMessage } from 'kafkajs';
import { FundsTransferredEvent } from '@shared/events';

@Controller()
export class FundsTransferredConsumer implements OnApplicationBootstrap, OnApplicationShutdown {
  @Inject('KAFKA_SERVICE')
  private readonly client: ClientKafka;

  @Inject(EventBus)
  private readonly eventBus: EventBus;

  public onApplicationBootstrap() {
    this.client.subscribeToResponseOf('FundsTransferredEvent');
  }

  public onApplicationShutdown() {
    this.client.close();
  }

  @MessagePattern('FundsTransferredEvent')
  public fundsTransferred(@Payload() { value }: KafkaMessage): any {
    const event: FundsTransferredEvent = plainToClass(FundsTransferredEvent, value);
    console.log('on FundsTransferredEvent', { event });

    this.eventBus.publish(event);
  }
}
