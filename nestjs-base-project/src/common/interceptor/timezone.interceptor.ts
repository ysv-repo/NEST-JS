import { Injectable } from '@nestjs/common';
import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TimeZoneService } from '../services/timezone.service';
import { WinstonLoggerService } from '../services/logger.service';

@Injectable()
export class TimeZoneInterceptor implements NestInterceptor {
  constructor(private readonly timeZoneService: TimeZoneService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (data && data.timestamp) {
          data.timestamp = this.timeZoneService.convertToTimeZone(new Date(data.timestamp));
        }
        return data;
      }),
    );
  }
}
