import { Inject } from '@nestjs/common';
import { SmsService } from './interfaces/sms-service.interface';

export class SmsProviderService {
  constructor(@Inject('SmsService') private readonly smsService: SmsService) {}
  async send(message: string, recipient: string): Promise<{ message: string }> {
    return await this.smsService.sendSms(message, recipient);
  }
}
