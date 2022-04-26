import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventSourcingHandler } from 'nest-event-sourcing';
import { AccountEventProducer } from '@command/common/producer/account-event.producer';
import { DepositFundsHandler } from './commands/deposit-funds.handler';
import { DepositFundsController } from './controllers/deposit-funds.controller';
import { FundsDepositedHandler } from './events/funds-deposited.handler';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BANK_ACCOUNT_QUERY_PACKAGE_NAME, BANK_ACCOUNT_QUERY_SERVICE_NAME } from '@command/common/proto/bank-account-query.pb';

@Module({
  imports: [
    CqrsModule,
    ClientsModule.register([
      {
        name: BANK_ACCOUNT_QUERY_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50051',
          package: BANK_ACCOUNT_QUERY_PACKAGE_NAME,
          protoPath: 'node_modules/bank-shared-proto/proto/bank-account-query.proto',
        },
      },
    ]),
  ],
  controllers: [DepositFundsController],
  providers: [DepositFundsHandler, FundsDepositedHandler, AccountEventProducer, EventSourcingHandler],
})
export class DepositFundsModule {}
