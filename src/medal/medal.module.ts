import { Module } from '@nestjs/common';
import { MedalService } from './medal.service';
import { MedalController } from './medal.controller';
import { PrismaService } from 'src/services/prisma.service';
import { ErrorHandlingService } from 'src/services/error_handling.service';

@Module({
  controllers: [MedalController],
  providers: [MedalService, PrismaService, ErrorHandlingService],
})
export class MedalModule {}
