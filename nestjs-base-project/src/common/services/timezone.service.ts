import { Injectable } from '@nestjs/common';
import moment from 'moment-timezone';

@Injectable()
export class TimeZoneService {
  private defaultTimeZone: string = 'America/New_York'; // Change to your preferred time zone

  convertToTimeZone(date: Date, timeZone: string = this.defaultTimeZone): string {
    return moment(date).tz(timeZone).format('YYYY-MM-DD HH:mm:ss');
  }

  setDefaultTimeZone(timeZone: string) {
    this.defaultTimeZone = timeZone;
  }

  getDefaultTimeZone() {
    return this.defaultTimeZone;
  }
}
