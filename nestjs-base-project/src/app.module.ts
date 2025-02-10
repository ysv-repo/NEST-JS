import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as moment from 'moment-timezone';
import { UsersModule } from './api/users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TokenValidationInterceptor } from './common/interceptor/jwt-token-validation.interceptor';
import { TimeZoneInterceptor } from './common/interceptor/timezone.interceptor';
import { LoggerModule } from './common/modules/logger.module';
import { WinstonLoggerService } from './common/services/logger.service';
import { TimeZoneService } from './common/services/timezone.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT!,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
    }),
    UsersModule,
    LoggerModule,
  ],
  providers: [
    AppService,
    WinstonLoggerService,
    TimeZoneService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeZoneInterceptor, // Register the interceptor globally
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TokenValidationInterceptor, // Register the interceptor globally
    },
  ],
  controllers: [AppController],
  exports: [WinstonLoggerService, TimeZoneService],
})
export class AppModule {
  constructor() {
    moment.tz.setDefault('Asia/Kolkata');
  }
}
