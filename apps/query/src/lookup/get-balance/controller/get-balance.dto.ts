import { IsUUID } from 'class-validator';

export class GetBalanceDto {
  @IsUUID()
  public id: string;
}
