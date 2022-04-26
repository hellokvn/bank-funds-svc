import { TransferFundsRequest } from '@command/common/proto/bank-funds-command.pb';
import { IsNumber, IsUUID, Min } from 'class-validator';

export class TransferFundsDto implements TransferFundsRequest {
  @IsUUID()
  public fromId: string;

  @IsNumber({ allowInfinity: false, allowNaN: false })
  @Min(1)
  public amount: number;

  @IsUUID()
  public toId: string;
}
