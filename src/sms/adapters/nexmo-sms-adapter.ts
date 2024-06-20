import { Injectable } from '@nestjs/common';
import { SmsService } from '../interfaces/sms-service.interface';
const { Vonage } = require('@vonage/server-sdk');

@Injectable()
export class NexmoSmsAdapter implements SmsService {
  private readonly nexmoClient: any;
  constructor() {
    this.nexmoClient = new Vonage({
      apiKey: process.env.VONAGE_API_KEY,
      apiSecret: process.env.VONAGE_API_SECRET,
    });
  }
  async sendSms(
    message: string,
    recipient: string,
  ): Promise<{ message: string }> {
    const result = await this.nexmoClient.sms
      .send({
        to: recipient,
        from: process.env.VONAGE_PHONE_NUMBER,
        text: message,
      })
      .then((resp) => {
        console.log('Message sent successfully');
        return resp.messages[0]['message-id'];
      })
      .catch((err) => {
        console.log('There was an error sending the messages.');
        console.error(err);
      });
    return {
      message: result,
    };
  }
}
