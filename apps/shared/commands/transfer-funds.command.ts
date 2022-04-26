import { BaseCommand } from 'nest-event-sourcing';
import { TransferFundsDto } from '@command/transfer-funds/controllers/transfer-funds.dto';

export class TransferFundsCommand extends BaseCommand {
  private amount: number;

  constructor(payload: TransferFundsDto) {
    super();

    this.id = payload.fromId;
    this.amount = payload.amount;
  }

  public getAmount(): number {
    return this.amount;
  }

  public setAmount(value: number) {
    this.amount = value;
  }
}
