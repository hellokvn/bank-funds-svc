import { TransferFundsRequest } from '@command/common/proto/bank-funds-command.pb';
import { IsNumber, IsUUID, Min } from 'class-validator';

export class TransferFundsDto implements TransferFundsRequest {
  @IsUUID()
  public readonly fromId: string;

  @IsNumber({ allowInfinity: false, allowNaN: false })
  @Min(1)
  public readonly amount: number;

  @IsUUID()
  public readonly toId: string;
}
