import { BaseEvent } from 'nestjs-event-sourcing';

import { DepositFundsCommand } from '@shared/commands/deposit-funds.command';

export class FundsDepositedEvent extends BaseEvent {
  public amount: number;

  constructor(command?: DepositFundsCommand) {
    super();

    if (!command) {
      return;
    }

    this.id = command.id;
    this.amount = command.getAmount();
  }
}
