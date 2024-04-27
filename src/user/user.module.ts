import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/services/prisma.service';
import { ErrorHandlingService } from 'src/services/error_handling.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, ErrorHandlingService],
})
export class UserModule {}
