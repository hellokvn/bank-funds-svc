import { GetBalanceDto } from '../controller/get-balance.dto';

export class GetBalanceQuery {
  public id: string;

  constructor(payload: GetBalanceDto) {
    this.id = payload.id;
  }
}
