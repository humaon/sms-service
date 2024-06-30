import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SmsProviderService } from './sms-provider.service';
import { TwilioSmsAdapter } from './adapters/twilio-sms-adapter';
import { NexmoSmsAdapter } from './adapters/nexmo-sms-adapter';
import { SmsController } from './sms.controller';
import { SmsAdapterFactory } from './adapters/sms-adapter.factory';
import { SmsQueueService } from './sms-queue.service';

@Module({
  imports: [
    ConfigModule, // Import ConfigModule to use ConfigService
  ],
  controllers: [SmsController],
  providers: [
    SmsProviderService,
    SmsAdapterFactory,
    TwilioSmsAdapter,
    NexmoSmsAdapter,
    SmsQueueService,
    {
      provide: 'SmsService',
      useFactory: (
        configService: ConfigService,
        smsAdapterFactory: SmsAdapterFactory,
        twilio: TwilioSmsAdapter,
        nexmo: NexmoSmsAdapter,
      ) => {
        console.log('configService:', configService); // Debugging
        console.log('smsAdapterFactory:', smsAdapterFactory); // Debugging
        console.log(
          'typeof smsAdapterFactory.registerProvider:',
          typeof smsAdapterFactory.registerProvider,
        ); // Debugging
        console.log(
          'typeof smsAdapterFactory.createSmsService:',
          typeof smsAdapterFactory.createSmsService,
        ); // Debugging
        console.log('twilio:', twilio); // Debugging
        console.log('nexmo:', nexmo); // Debugging

        smsAdapterFactory.registerProvider('twilio', twilio);
        smsAdapterFactory.registerProvider('nexmo', nexmo);
        return smsAdapterFactory.createSmsService();
      },
      inject: [
        ConfigService,
        SmsAdapterFactory,
        TwilioSmsAdapter,
        NexmoSmsAdapter,
      ],
    },
  ],
  exports: [SmsProviderService, SmsQueueService],
})
export class SmsModule {}
