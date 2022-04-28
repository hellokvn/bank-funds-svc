import { HttpException, HttpStatus } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';

import { FundsReceivedEvent } from '@shared/events';
import { Funds } from '@query/common/entity/funds.entity';
import { FundsRepository } from '@query/common/repository/funds.repository';

@EventsHandler(FundsReceivedEvent)
export class FundsReceivedHandler implements IEventHandler<FundsReceivedEvent> {
  @InjectRepository(FundsRepository)
  private readonly repository: FundsRepository;

  public async handle(event: FundsReceivedEvent): Promise<void> {
    const funds: Funds = await this.repository.findOne(event.id);

    if (!funds) {
      throw new HttpException('No account found', HttpStatus.NO_CONTENT);
    }

    this.repository.update(funds.id, { balance: funds.balance + event.amount });
  }
}
