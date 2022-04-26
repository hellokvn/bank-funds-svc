import { WithdrawFundsCommand } from '@shared/commands/withdraw-funds.command';
import { BaseEvent } from 'nest-event-sourcing';

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
