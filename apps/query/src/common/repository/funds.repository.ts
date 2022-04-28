import { EntityRepository, Repository } from 'typeorm';

import { Funds } from '../entity/funds.entity';

@EntityRepository(Funds)
export class FundsRepository extends Repository<Funds> {}
