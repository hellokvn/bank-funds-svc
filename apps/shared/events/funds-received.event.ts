import { BaseEvent } from 'nestjs-event-sourcing';

import { ReceiveFundsCommand } from '@shared/commands';

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
