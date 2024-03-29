import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { RabbitMQ } from './common/constants';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      cors: true,
      urls:[process.env.AMQP_URL],
      queue: RabbitMQ.OrderQueue,
    },
  });
  await app.listen();
  console.log('Microservice Orders is listening')
}
bootstrap();
