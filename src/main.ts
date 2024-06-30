import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module'; // Adjust the path if necessary

async function bootstrap() {
  console.log('Starting microservice...');
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

  await app.listen();
  console.log('Microservice is listening');
}

bootstrap().catch((err) => {
  console.error('Error in bootstrap', err);
});
