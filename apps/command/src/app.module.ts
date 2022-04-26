import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventSourcingModule } from 'nest-event-sourcing';
import { DepositFundsModule } from './deposit-funds/deposit-funds.module';
import { WithdrawFundsModule } from './withdraw-funds/withdraw-funds.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EventSourcingModule.forRoot({ mongoUrl: 'mongodb://localhost:27017/funds' }),
    DepositFundsModule,
    WithdrawFundsModule,
  ],
})
export class AppModule {}
