import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FundsRepository } from '@query/common/repository/funds.repository';
import { FundsWithdrawnConsumer } from './consumer/funds-withdrawn.consumer';
import { FundsWithdrawnHandler } from './event/funds-withdrawn.handler';

@Module({
  imports: [
    CqrsModule,
    ClientsModule.register([{ name: 'KAFKA_SERVICE', transport: Transport.KAFKA }]),
    TypeOrmModule.forFeature([FundsRepository]),
  ],
  controllers: [FundsWithdrawnConsumer],
  providers: [FundsWithdrawnHandler],
})
export class FundsWithdrawnModule {}
