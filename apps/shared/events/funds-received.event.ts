import { ReceiveFundsCommand } from '@shared/commands';
import { BaseEvent } from 'nest-event-sourcing';

export class FundsReceivedEvent extends BaseEvent {
  public amount: number;

  constructor(command?: ReceiveFundsCommand) {
    super();

    if (!command) {
      return;
    }

    this.id = command.id;
    this.amount = command.getAmount();
  }
}
