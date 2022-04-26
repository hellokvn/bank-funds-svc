import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Kafka, Producer } from 'kafkajs';
import { BaseEvent } from 'nest-event-sourcing';

@Injectable()
export class AccountEventProducer implements OnModuleDestroy {
  private readonly producer: Producer;

  constructor() {
    const kafka: Kafka = new Kafka({
      clientId: 'BankFunds',
      brokers: ['localhost:9092'],
    });

    this.producer = kafka.producer();
    this.producer.connect();
  }

  public onModuleDestroy() {
    this.producer.disconnect();
  }

  public produce<T extends BaseEvent>(topic: string, event: T): void {
    console.log('AccountEventProducer', topic);
    this.producer.send({ topic: topic, messages: [{ value: JSON.stringify(event) }] });
  }
}
