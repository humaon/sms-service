export interface SmsService {
  sendSms(message: string, recipient: string): Promise<{ message: string }>;
}
