import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FundsRepository } from '@query/common/repository/funds.repository';
import { FundsDepositedConsumer } from './consumer/funds-deposited.consumer';
import { FundsDepositedHandler } from './event/funds-deposited.handler';

@Module({
  imports: [
    CqrsModule,
    ClientsModule.register([{ name: 'KAFKA_SERVICE', transport: Transport.KAFKA }]),
    TypeOrmModule.forFeature([FundsRepository]),
  ],
  controllers: [FundsDepositedConsumer],
  providers: [FundsDepositedHandler],
})
export class FundsDepositedModule {}
