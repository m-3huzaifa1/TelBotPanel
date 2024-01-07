import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000','https://telbotclient.onrender.com',"https://telbotclient.netlify.app","https://yd2af43g3w.ap-southeast-1.awsapprunner.com"],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  const port = process.env.PORT || 8081;
  await app.listen(port, '0.0.0.0');  
}

bootstrap();
