import { Injectable, Inject } from '@nestjs/common';

import { SmsQueueService } from './sms-queue.service'; // Import the new SmsQueueService

@Injectable()
export class SmsProviderService {
  constructor(
    private readonly smsQueueService: SmsQueueService, // Inject the new SmsQueueService
  ) {}

  async send(
    message: string,
    recipient: string,
    delayMs: number = 0,
  ): Promise<void> {
    if (delayMs > 0) {
      await this.smsQueueService.sendDelayedSms(message, recipient, delayMs);
    } else {
      await this.smsQueueService.sendSms(message, recipient);
    }
  }
}
