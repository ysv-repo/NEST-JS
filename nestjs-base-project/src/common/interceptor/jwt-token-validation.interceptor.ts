import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Observable } from 'rxjs';

@Injectable()
export class TokenValidationInterceptor implements NestInterceptor {
  private readonly SECRET_KEY = 'chemsecret';
  private readonly JWT_EXPIRATION = '5h'; // Set your token expiration time here

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response: Response = context.switchToHttp().getResponse();

    const token = request.headers['authorization']?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }
    try {
      const decoded = this.verifyToken(token);
      // const newToken = this.generateToken(decoded.subject);
      // response.headers.set('Authorization', `Bearer ${newToken}`);
      console.log('response', response);
    } catch (err) {
      throw new UnauthorizedException('Token is invalid or expired');
    }
    return next.handle();
  }
 

  getUsernameFromToken(token: string): string {
    const decoded = this.verifyToken(token);
    return decoded.subject;
  }
//  
  verifyToken(authToken: string): any {
    try {
      return jwt.verify(authToken, this.SECRET_KEY);
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  generateToken(subject: string): string {
    const payload = { subject };
    return jwt.sign(payload, this.SECRET_KEY, {
      expiresIn: this.JWT_EXPIRATION, // Set expiration time as needed
    });
  }
}