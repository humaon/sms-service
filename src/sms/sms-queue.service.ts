import { Inject, Injectable } from '@nestjs/common';
import { SmsService } from './interfaces/sms-service.interface';

@Injectable()
export class SmsQueueService {
  constructor(@Inject('SmsService') private readonly smsService: SmsService) {
    // Inject the interface implementation
  }

  async sendSms(message: string, recipient: string): Promise<void> {
    // await firstValueFrom(this.client.emit('send_sms', payload));
    await this.smsService.sendSms(message, recipient, 0);
  }

  async sendDelayedSms(
    message: string,
    recipient: string,
    delayMs: number,
  ): Promise<void> {
    await this.smsService.sendSms(message, recipient, delayMs);
    // await firstValueFrom(this.client.emit('send_sms', payload));
  }
}
