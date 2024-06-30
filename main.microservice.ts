import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './src/app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'sms_queue',
        queueOptions: {
          durable: true,
        },
      },
    },
  );
  console.log('listening');
  app.listen();
}

bootstrap().catch((err) => {
  console.error('Error starting microservice', err);
});
