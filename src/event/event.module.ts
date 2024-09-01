import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { PrismaService } from 'src/services/prisma.service';
import { ErrorHandlingService } from 'src/services/error_handling.service';

@Module({
  controllers: [EventController],
  providers: [EventService, PrismaService, ErrorHandlingService],
})
export class EventModule {}
