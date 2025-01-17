import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern('transaction_created')
  handleTransactionCreated(data: any) {
    data.status = data.amount > 1000 ? 'REJECTED' : 'APPROVED';
    const dataToReturn = this.appService.handleTransactionCreated(data);
    console.log(dataToReturn);
    return dataToReturn;
  }
}
