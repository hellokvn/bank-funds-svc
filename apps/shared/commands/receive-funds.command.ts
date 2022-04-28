import { BaseCommand } from 'nestjs-event-sourcing';

import { FundsTransferredEvent } from '@shared/events';

export class ReceiveFundsCommand extends BaseCommand {
  private fromId: string;
  private amount: number;

  constructor(payload: FundsTransferredEvent) {
    console.log('ReceiveFundsCommand/con');
    super();

    this.id = payload.targetedId;
    this.fromId = payload.id;
    this.amount = payload.amount;
  }

  public getFromId(): string {
    return this.fromId;
  }

  public setFromId(value: string) {
    this.fromId = value;
  }

  public getAmount(): number {
    return this.amount;
  }

  public setAmount(value: number) {
    this.amount = value;
  }
}
