import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FundsRepository } from '@query/common/repository/funds.repository';
import { FundsTransferredConsumer } from './consumer/funds-transferred.consumer';
import { FundsTransferredHandler } from './event/funds-transferred.handler';

@Module({
  imports: [
    CqrsModule,
    ClientsModule.register([{ name: 'KAFKA_SERVICE', transport: Transport.KAFKA }]),
    TypeOrmModule.forFeature([FundsRepository]),
  ],
  controllers: [FundsTransferredConsumer],
  providers: [FundsTransferredHandler],
})
export class FundsTransferredModule {}
