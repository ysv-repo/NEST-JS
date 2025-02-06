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

    // Ensure the log directory exists and has proper permissions
    const logDirectory = path.join(__dirname, 'logs');
    const logFilePath = path.join(logDirectory, '%DATE%-app.log');

    // Create the log directory if it doesn't exist
    if (!fs.existsSync(logDirectory)) {
      fs.mkdirSync(logDirectory, { recursive: true }); // Creating the directory if it doesn't exist
      console.log(`Log directory created at ${logDirectory}`);
    }

    // Initialize the logger with Winston
    this.logger = winston.createLogger({
      levels: logLevels.levels,
      transports: [
        // Console transport
        new winston.transports.Console({
          level: 'debug', // All logs from 'debug' and above will be shown
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
          ),
        }),

        // File transport with daily log rotation
        new DailyRotateFile({
          filename: logFilePath, // Rotating file path
          datePattern: 'YYYY-MM-DD',
          level: 'debug', // Ensure that 'debug' and all higher levels are logged to the file
          format: winston.format.combine(
            winston.format.timestamp({
              // Using moment-timezone to format the timestamp in IST
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

  // Implement required methods from NestJS LoggerService
  log(message: string) {
    this.logger.info(message);
  }

  error(message: string, trace: string) {
    this.logger.error(`${message} - ${trace}`);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  verbose(message: string) {
    this.logger.verbose(message);
  }
}
