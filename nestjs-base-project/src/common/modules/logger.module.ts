import { Global, Module } from '@nestjs/common';
import { WinstonLoggerService } from 'src/common/services/logger.service';

@Global()
@Module({
  providers: [WinstonLoggerService],
  exports: [WinstonLoggerService], // Export to make it available to other modules
})
export class LoggerModule {}
