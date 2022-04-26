import { Module } from '@nestjs/common';
import { FundsDepositedModule } from './funds-deposited/funds-deposited.module';
import { FundsTransferedModule } from './funds-transfered/funds-transfered.module';
import { FundsWithdrawnModule } from './funds-withdrawn/funds-withdrawn.module';

@Module({
  imports: [FundsDepositedModule, FundsTransferedModule, FundsWithdrawnModule],
})
export class ConsumerModule {}
