import { QueryHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';

import { Funds } from '@query/common/entity/funds.entity';
import { FundsRepository } from '@query/common/repository/funds.repository';
import { GetBalanceQuery } from './get-balancet.query';

@QueryHandler(GetBalanceQuery)
export class GetBalanceQueryHandler implements ICommandHandler<GetBalanceQuery> {
  @InjectRepository(FundsRepository)
  private readonly repository: FundsRepository;

  public execute(query: GetBalanceQuery): Promise<Funds> {
    return this.repository.findOne(query.id);
  }
}
