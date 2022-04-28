import { BaseCommand } from 'nestjs-event-sourcing';

import { DepositFundsDto } from '@command/deposit-funds/controllers/deposit-funds.dto';

export class DepositFundsCommand extends BaseCommand {
  private amount: number;

  constructor(payload: DepositFundsDto) {
    super();

    this.id = payload.id;
    this.amount = payload.amount;
  }

  public getAmount(): number {
    return this.amount;
  }

  public setAmount(value: number) {
    this.amount = value;
  }
}
