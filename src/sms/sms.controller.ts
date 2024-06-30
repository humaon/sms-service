import { Controller } from '@nestjs/common';
import { SmsProviderService } from './sms-provider.service';
import { EventPattern } from '@nestjs/microservices';
@Controller('sms')
export class SmsController {
  constructor(private readonly smsProviderService: SmsProviderService) {}
  @EventPattern('send_sms')
  async handleSendSms(data: {
    message: string;
    recipient: string;
    delay: number;
  }) {
    console.log('inside');
    console.log(data);
    if (data.delay > 0) {
      console.log('delay');
      // Simulate delay
      await new Promise((resolve) => setTimeout(resolve, data.delay));
    }
    await this.smsProviderService.send(data.message, data.recipient);
  }
}
