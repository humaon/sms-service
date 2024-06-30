export interface SmsService {
  sendSms(
    message: string,
    recipient: string,
    delay: number,
  ): Promise<{ message: string }>;
}
