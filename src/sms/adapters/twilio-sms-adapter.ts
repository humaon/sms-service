import { Injectable } from '@nestjs/common';
import { SmsService } from '../interfaces/sms-service.interface';
import * as twilio from 'twilio';
@Injectable()
export class TwilioSmsAdapter implements SmsService {
  private readonly twilioClient: twilio.Twilio;
  constructor() {
    this.twilioClient = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN,
    );
  }

  async sendSms(
    message: string,
    recipient: string,
  ): Promise<{ message: string }> {
    const result = await this.twilioClient.messages.create({
      body: message,
      to: recipient,
      from: process.env.TWILIO_PHONE_NUMBER,
    });
    return {
      message: result.body,
    };
  }
}
