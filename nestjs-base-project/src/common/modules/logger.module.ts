import { Global, Module } from '@nestjs/common';
import { WinstonLoggerService } from 'src/common/services/logger.service';

@Global()
@Module({
  providers: [WinstonLoggerService],
  exports: [WinstonLoggerService], 
})
export class LoggerModule {}
