import { Controller, Post } from '@nestjs/common';
import { SmsProviderService } from './sms-provider.service';
@Controller('sms')
export class SmsController {
  constructor(private readonly smsProviderService: SmsProviderService) {}
  @Post('/send')
  async send(): Promise<{ status: string; data: { message: string } }> {
    const response = await this.smsProviderService.send(
      'this is text message',
      '+8801926882124',
    );
    console.log(response);
    return { status: 'SMS sent', data: response };
  }
}
