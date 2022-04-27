import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { ReceiveFundsCommand } from '@shared/commands';
import { FundsTransferredEvent } from '@shared/events';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Injectable()
export class TransferFundsSaga {
  // @Inject(CommandBus)
  // private readonly commandBus: CommandBus;

  @Saga()
  private onEvent(events$: Observable<FundsTransferredEvent>): Observable<ICommand> {
    return events$.pipe(
      ofType(FundsTransferredEvent),
      delay(1000),
      map((event: FundsTransferredEvent) => {
        return new ReceiveFundsCommand(event);
      }),
    );
  }
}
