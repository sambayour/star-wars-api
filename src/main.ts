import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ResponseInterceptor } from './interceptors/response-interceptor';

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

  app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(port);
}
bootstrap();
