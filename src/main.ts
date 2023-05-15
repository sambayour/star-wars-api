import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ResponseInterceptor } from './interceptors/response-interceptor';
import { ValidationPipe } from './pipes/validation.pipe';
import 'dotenv/config';

async function bootstrap() {
  const port = process.env.PORT ? Number(process.env.PORT) : 2023;

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Star Wars Api')
    .setDescription('API docs for Star Wars.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ResponseInterceptor());
  console.log('Star Wars API running on port', port);
  await app.listen(port);
}
bootstrap();
