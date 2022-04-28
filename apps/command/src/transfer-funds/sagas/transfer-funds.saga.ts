import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { ReceiveFundsCommand } from '@shared/commands';
import { FundsTransferredEvent } from '@shared/events';

@Injectable()
export class TransferFundsSaga {
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
