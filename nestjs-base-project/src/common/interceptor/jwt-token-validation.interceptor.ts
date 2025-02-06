import { Injectable } from '@nestjs/common';
import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken'; // Import jsonwebtoken to verify JWT
import { WinstonLoggerService } from '../services/logger.service';

@Injectable()
export class TokenValidationInterceptor implements NestInterceptor {
  private readonly jwtSecretKey = 'chemiasoft'; // Replace with your JWT secret or use environment variables

  constructor(private logger: WinstonLoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Get the request object from the context
    const request = context.switchToHttp().getRequest();

    // Get the token from the Authorization header
    const token = request.headers['authorization']?.split(' ')[1]; // Assuming format is "Bearer <token>"

    if (!token) {
      this.logger.error('UnauthorizedException - ', 'Token is missing');
      throw new Error('Token is missing');
    }

    try {
      // Verify the token using the secret key
      const decoded = jwt.verify(token, this.jwtSecretKey);

      // If the token is valid, continue with the request
      request.user = decoded; // Optionally attach the decoded token (user data) to the request
    } catch (err) {
      // If the token is invalid or expired, return an UnauthorizedException
      this.logger.error('UnauthorizedException - ', 'Token is invalid or expired');
      throw new UnauthorizedException('Token is invalid or expired');
    }

    return next.handle(); // Continue the request processing
  }
}
