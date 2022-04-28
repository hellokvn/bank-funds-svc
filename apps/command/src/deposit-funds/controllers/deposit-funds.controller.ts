import { Body, Controller, HttpStatus, Inject } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';

import { DepositFundsCommand } from '@shared/commands/deposit-funds.command';
import { BANK_FUNDS_COMMAND_SERVICE_NAME, DepositFundsResponse } from '@command/common/proto/bank-funds-command.pb';
import { DepositFundsDto } from './deposit-funds.dto';

@Controller()
export class DepositFundsController {
  @Inject(CommandBus)
  private readonly commandBus: CommandBus;

  @GrpcMethod(BANK_FUNDS_COMMAND_SERVICE_NAME, 'DepositFunds')
  public async depositFunds(@Body() payload: DepositFundsDto): Promise<DepositFundsResponse> {
    const command: DepositFundsCommand = new DepositFundsCommand(payload);

    await this.commandBus.execute(command);

    return { status: HttpStatus.OK, error: null };
  }
}
