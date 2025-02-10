import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import * as path from 'path';
import moment from 'moment-timezone';
import DailyRotateFile from 'winston-daily-rotate-file';
import * as fs from 'fs';

@Injectable()
export class WinstonLoggerService implements LoggerService {
  private logger: winston.Logger;

  constructor() {
    const logLevels = {
      levels: {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        verbose: 4,
        debug: 5,
        silly: 6,
      },
      colors: {
        error: 'red',
        warn: 'yellow',
        info: 'green',
        http: 'magenta',
        verbose: 'cyan',
        debug: 'blue', 
        silly: 'grey',
      },
    }; 
    const logDirectory = path.join(__dirname,'../../../', 'logs');
    const logFilePath = path.join(logDirectory, '%DATE%-app.log');
    if (!fs.existsSync(logDirectory)) {
      fs.mkdirSync(logDirectory, { recursive: true }); 
      console.log(`Log directory created at ${logDirectory}`);
    }
    this.logger = winston.createLogger({
      levels: logLevels.levels,
      transports: [
        new winston.transports.Console({
          level: 'debug', 
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
          ),
        }),

        new DailyRotateFile({
          filename: logFilePath, 
          datePattern: 'YYYY-MM-DD',
          level: 'debug', 
          format: winston.format.combine(
            winston.format.timestamp({
              format: () => moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss'),
            }),
            winston.format.printf(({ timestamp, level, message }) => {
              return `${timestamp} ${level}: ${message}`;
            }),
          ),
        }),
      ],
    }); 

    winston.addColors(logLevels.colors);
  }

  log(message: any) {
    this.logger.info(message);
  }

  error(message: string, trace: any) {
    this.logger.error(`${message} - ${trace}`);
  }
  

  warn(message: any) {
    this.logger.warn(message);
  }

  debug(message: any) {
    this.logger.debug(message);
  }

  verbose(message: any) {
    this.logger.verbose(message);
  }
}
