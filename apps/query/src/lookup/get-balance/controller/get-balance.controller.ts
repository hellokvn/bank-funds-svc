import { Controller, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GrpcMethod, Payload } from '@nestjs/microservices';

import { Funds } from '@query/common/entity/funds.entity';
import { BANK_FUNDS_QUERY_SERVICE_NAME, GetBalanceResponse } from '@query/common/proto/bank-funds-query.pb';
import { GetBalanceDto } from './get-balance.dto';
import { GetBalanceQuery } from '../query/get-balancet.query';

@Controller()
export class GetBalanceController {
  @Inject(QueryBus)
  private readonly queryBus: QueryBus;

  @GrpcMethod(BANK_FUNDS_QUERY_SERVICE_NAME, 'GetBalance')
  private async getBalance(@Payload() payload: GetBalanceDto): Promise<GetBalanceResponse> {
    console.log('findAccount', { payload });
    const query: GetBalanceQuery = new GetBalanceQuery(payload);
    const data: Funds = await this.queryBus.execute(query);
    console.log({ data });

    if (!data) {
      throw new HttpException('No account found!', HttpStatus.NO_CONTENT);
    }

    return { data: data.balance, status: HttpStatus.OK, error: null };
  }
}
