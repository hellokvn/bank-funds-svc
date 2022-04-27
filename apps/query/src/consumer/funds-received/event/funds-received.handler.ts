import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { FundsRepository } from '../../../common/repository/funds.repository';
import { Funds } from '../../../common/entity/funds.entity';
import { FundsReceivedEvent } from '@shared/events';
import { HttpException, HttpStatus } from '@nestjs/common';

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
