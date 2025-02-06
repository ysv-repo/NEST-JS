import { NestFactory } from '@nestjs/core';
import { WinstonLoggerService } from './common/services/logger.service';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { AllExceptionsFilter } from './common/filters/exception.filter';
import { TimeZoneInterceptor } from './common/interceptor/timezone.interceptor';
import { TimeZoneService } from './common/services/timezone.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get(WinstonLoggerService);
  app.useGlobalFilters(new AllExceptionsFilter(new WinstonLoggerService()));
  app.useGlobalInterceptors(new TimeZoneInterceptor(new TimeZoneService()));
  app.useLogger(logger);
  if (process.env.NODE_ENV === 'production') {
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe());
  }
  logger.log('App has started');
  await app.listen(3000);
}
bootstrap();
