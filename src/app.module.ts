import {
  CacheInterceptor,
  CacheModule,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CatsModule } from './cats/cats.module';
import {
  LoggerMiddleware,
  logger,
} from './common/middlewares/logger.middleware';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthGuard } from './common/guards/auth.guard';
import { RolesGuard } from './common/guards/role.guard';
import { ThrottlerModule } from '@nestjs/throttler';
import { CustomThrottlerGuard } from './common/guards/throttler.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.development.env', '.env'],
      isGlobal: true,
      cache: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadModels: true,
      logging: false,
    }),
    CacheModule.register({
      ttl: 5, // seconds
      max: 10, // maximum number of items in cache
      isGlobal: true,
    }),
    ThrottlerModule.forRoot({
      ttl: 60, // 60 seconds
      limit: 10, // 10 times
    }),
    ScheduleModule.forRoot(),
    UsersModule,
    CatsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // global exception handler
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    // global cache request
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    // global auth guard
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    // global role guard
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    // global throttler guard
    {
      provide: APP_GUARD,
      useClass: CustomThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, logger)
      .exclude(
        { path: 'v2/cats', method: RequestMethod.GET },
        { path: 'v1/cats', method: RequestMethod.GET },
        // { path: 'cats', method: RequestMethod.POST },
        // 'cats/(.*)',
      )
      .forRoutes('v1/cats', 'v2/cats', 'v1/users');
    // .forRoutes({ path: 'cats', method: RequestMethod.GET });
  }
}
