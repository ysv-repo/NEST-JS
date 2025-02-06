import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from 'src/entities/user.entity';
import { WinstonLoggerService } from '../../common/services/logger.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  providers: [UsersService, WinstonLoggerService],
  controllers: [UsersController],
  exports: [WinstonLoggerService],
})
export class UsersModule {}
