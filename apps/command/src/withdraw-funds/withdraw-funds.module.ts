import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EventSourcingHandler } from 'nestjs-event-sourcing';

import { AccountEventProducer } from '@command/common/producer/account-event.producer';
import { WithdrawFundsHandler } from './commands/withdraw-funds.handler';
import { WithdrawFundsController } from './controllers/withdraw-funds.controller';
import { FundsWithdrawnHandler } from './events/funds-withdrawn.handler';
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
  controllers: [WithdrawFundsController],
  providers: [WithdrawFundsHandler, FundsWithdrawnHandler, AccountEventProducer, EventSourcingHandler],
})
export class WithdrawFundsModule {}
