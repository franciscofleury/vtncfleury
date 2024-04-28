import { Module } from '@nestjs/common';
import { TitleService } from './title.service';
import { TitleController } from './title.controller';
import { ErrorHandlingService } from '../services/error_handling.service';
import { PrismaService } from '../services/prisma.service';

@Module({
  controllers: [TitleController],
  providers: [TitleService, PrismaService, ErrorHandlingService],
})
export class TitleModule {}
