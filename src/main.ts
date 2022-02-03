import { VersioningType } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { resolve } from 'path';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // get user ip behind proxy
  app.set('trust proxy', true);
  // must come before other app.use()
  // app.use(helmet());
  app.enableCors({ credentials: true });
  // static file serve at http://localhost:3000/yourFileName
  app.useStaticAssets(resolve('public'));
  // cookie middleware
  app.use(cookieParser(process.env.COOKIE_SECRET));
  // csrf prevention (must initialize cookie/session first)
  // default ignore method : ['GET', 'HEAD', 'OPTIONS']
  app.use(
    csurf({
      cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        signed: true,
      },
    }),
  );
  // global api prefix http://localhost/api/...
  app.setGlobalPrefix('api');
  // api versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  // global error handling
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('start with http://hostname/')
    .setVersion('1.0')
    .addTag('cats')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: { persistAuthorization: true },
    customSiteTitle: 'Api Documentation',
  });

  await app.listen(3000);
}

bootstrap();
