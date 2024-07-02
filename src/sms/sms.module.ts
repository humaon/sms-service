import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SmsProviderService } from './sms-provider.service';
import { TwilioSmsAdapter } from './adapters/twilio-sms-adapter';
import { NexmoSmsAdapter } from './adapters/nexmo-sms-adapter';
import { SmsController } from './sms.controller';
import { SmsAdapterFactory } from './adapters/sms-adapter.factory';
import { SmsService } from './interfaces/sms-service.interface';

import { BullModule } from '@nestjs/bull';
import { SmsProcessor } from './sms.processor';
@Module({
  imports: [
    ConfigModule, // Import ConfigModule to use ConfigService
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'sms',
    }),
  ],
  controllers: [SmsController],
  providers: [
    SmsProviderService,
    SmsAdapterFactory,
    TwilioSmsAdapter,
    NexmoSmsAdapter,

    SmsProcessor,
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
  exports: [SmsProviderService],
})
export class SmsModule {}
