import { TransferFundsCommand } from '@shared/commands/transfer-funds.command';
import { BaseEvent } from 'nest-event-sourcing';

export class FundsTransferredEvent extends BaseEvent {
  public targetedId: string;
  public amount: number;

  constructor(command?: TransferFundsCommand) {
    super();

    if (!command) {
      return;
    }

    this.id = command.id;
    this.targetedId = command.getTargetedId();
    this.amount = command.getAmount();
  }
}
