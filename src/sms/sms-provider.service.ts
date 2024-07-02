import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
@Injectable()
export class SmsProviderService {
  constructor(@InjectQueue('sms') private readonly smsQueue: Queue) {}

  async addSmsJob(
    message: string,
    recipient: string,
    delayMs: number = 0,
  ): Promise<void> {
    await this.smsQueue.add(
      { message, recipient },
      { delay: delayMs }, // Add the delay here
    );
  }
}
