import { Controller } from '@nestjs/common';
import { SmsProviderService } from './sms-provider.service';
import { MessagePattern } from '@nestjs/microservices';
@Controller('sms')
export class SmsController {
  constructor(private readonly smsProviderService: SmsProviderService) {}
  @MessagePattern({ cmd: 'send_sms' })
  async send(): Promise<{ status: string; data: { message: string } }> {
    const response = await this.smsProviderService.send(
      'this is text message',
      '+8801926882124',
    );
    console.log(response);
    return { status: 'SMS sent', data: response };
  }
}
