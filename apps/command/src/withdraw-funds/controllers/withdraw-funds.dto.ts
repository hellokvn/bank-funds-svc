import { IsNumber, IsUUID, Min } from 'class-validator';

import { WithdrawFundsRequest } from '@command/common/proto/bank-funds-command.pb';

export class WithdrawFundsDto implements WithdrawFundsRequest {
  @IsUUID()
  public id: string;

  @IsNumber({ allowInfinity: false, allowNaN: false })
  @Min(1)
  public amount: number;
}
