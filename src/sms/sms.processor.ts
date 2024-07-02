import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

import { SmsService } from './interfaces/sms-service.interface';
import { Inject } from '@nestjs/common';

@Processor('sms')
export class SmsProcessor {
  constructor(@Inject('SmsService') private readonly smsService: SmsService) {}

  @Process()
  async handleSendSms(job: Job<{ message: string; recipient: string }>) {
    const { message, recipient } = job.data;

    console.log('Received job data:', job.data);

    await this.smsService.sendSms(message, recipient);
    console.log(`Message "${message}" sent to ${recipient}`);
  }
}
