import { BaseEvent } from 'nestjs-event-sourcing';

import { WithdrawFundsCommand } from '@shared/commands/withdraw-funds.command';

export class FundsWithdrawnEvent extends BaseEvent {
  public amount: number;

  constructor(command?: WithdrawFundsCommand) {
    super();

    if (!command) {
      return;
    }

    this.id = command.id;
    this.amount = command.getAmount();
  }
}
