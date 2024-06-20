import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SmsService } from '../interfaces/sms-service.interface';

@Injectable()
export class SmsAdapterFactory {
  private providers: Map<string, SmsService> = new Map();

  constructor(private readonly configService: ConfigService) {
    console.log(
      'ConfigService initialized in SmsAdapterFactory:',
      this.configService,
    ); // Debugging
  }

  registerProvider(key: string, provider: SmsService): void {
    console.log(`Registering provider: ${key}`); // Debugging
    this.providers.set(key, provider);
  }

  createSmsService(): SmsService {
    const providerKey = this.configService.get<string>('SMS_PROVIDER');
    console.log(`Provider Key: ${providerKey}`); // Debugging
    const provider = this.providers.get(providerKey);
    if (!provider) {
      throw new Error(`Invalid SMS provider: ${providerKey}`);
    }
    return provider;
  }
}
