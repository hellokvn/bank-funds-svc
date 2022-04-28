import { Module } from '@nestjs/common';

import { GetBalanceModule } from './get-balance/get-balance.module';

@Module({
  imports: [GetBalanceModule],
})
export class LookupModule {}
