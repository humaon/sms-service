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
    console.log(data, 'event fired');
    await this.smsProviderService.addSmsJob(
      data.message,
      data.recipient,
      data.delay,
    );
  }
}
