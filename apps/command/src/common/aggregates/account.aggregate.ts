import { DepositFundsCommand } from '@shared/commands/deposit-funds.command';
import { FundsDepositedEvent } from '@shared/events/funds-deposited.event';
import { WithdrawFundsCommand } from '@shared/commands/withdraw-funds.command';
import { FundsWithdrawnEvent } from '@shared/events/funds-withdrawn.event';
import { ExtendedAggregateRoot } from 'nest-event-sourcing';
import { ReceiveFundsCommand, TransferFundsCommand } from '@shared/commands';
import { FundsReceivedEvent, FundsTransferredEvent } from '@shared/events';

export class AccountAggregate extends ExtendedAggregateRoot {
  private balance: number;

  constructor() {
    super();

    this.balance = 0;
  }

  public getBalance(): number {
    return this.balance;
  }

  public setBalance(value: number) {
    this.balance = value;
  }

  // methods

  public depositFunds(command: DepositFundsCommand): void | never {
    const event: FundsDepositedEvent = new FundsDepositedEvent(command);
    // logic
    this.apply(event);
  }

  public onFundsDepositedEvent(event: FundsDepositedEvent): void {
    this.id = event.id;
    this.setBalance(this.getBalance() + event.amount);
  }

  public withdrawFunds(command: WithdrawFundsCommand): void | never {
    const event: FundsDepositedEvent = new FundsWithdrawnEvent(command);
    // logic
    this.apply(event);
  }

  public onFundsWithdrawnEvent(event: FundsWithdrawnEvent): void {
    this.id = event.id;
    this.setBalance(this.getBalance() - event.amount);
  }

  public transferFunds(command: TransferFundsCommand): void | never {
    const event: FundsTransferredEvent = new FundsTransferredEvent(command);
    // logic
    this.apply(event);
  }

  public onFundsTransferredEvent(event: FundsTransferredEvent): void {
    this.id = event.id;
    this.setBalance(this.getBalance() - event.amount);
  }

  public receiveFunds(command: ReceiveFundsCommand): void | never {
    const event: FundsReceivedEvent = new FundsReceivedEvent(command);
    // logic
    this.apply(event);
  }

  public onFundsReceivedEvent(event: FundsReceivedEvent): void {
    this.id = event.id;
    this.setBalance(this.getBalance() + event.amount);
  }
}
