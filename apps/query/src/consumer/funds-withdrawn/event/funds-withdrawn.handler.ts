import { HttpException, HttpStatus } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';

import { FundsWithdrawnEvent } from '@shared/events';
import { Funds } from '@query/common/entity/funds.entity';
import { FundsRepository } from '@query/common/repository/funds.repository';

@EventsHandler(FundsWithdrawnEvent)
export class FundsWithdrawnHandler implements IEventHandler<FundsWithdrawnEvent> {
  @InjectRepository(FundsRepository)
  private readonly repository: FundsRepository;

  public async handle(event: FundsWithdrawnEvent): Promise<void> {
    if (event.version === 0) {
      const funds: Funds = new Funds();

      funds.id = event.id;
      funds.balance = event.amount;

      await this.repository.save(funds);

      return;
    }

    const funds: Funds = await this.repository.findOne(event.id);

    if (!funds) {
      throw new HttpException('No account found', HttpStatus.NO_CONTENT);
    }

    this.repository.update(funds.id, { balance: funds.balance - event.amount });
  }
}
