import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MedalService } from './medal.service';
import { CreateMedalDto } from './dto/create-medal.dto';
import { UpdateMedalDto } from './dto/update-medal.dto';
import { PrismaService } from 'src/services/prisma.service';
import { ErrorHandlingService } from 'src/services/error_handling.service';

@Controller('medal')
export class MedalController {
  constructor(private readonly medalService: MedalService) {}

  @Post()
  async create(@Body() createMedalDto: CreateMedalDto) {
    const new_medal = await this.medalService.create(createMedalDto);

    return { data: new_medal };
  }

  @Get()
  async findAll() {
    const medal_list = await this.medalService.findAll();

    return { data: medal_list };
  }

  @Get(':name')
  async findOne(@Param('name') name: string) {
    const medal = this.medalService.findOne(name);

    return { data: medal };
  }

  @Patch(':name')
  async update(
    @Param('name') name: string,
    @Body() updateMedalDto: UpdateMedalDto,
  ) {
    const updated = await this.medalService.update(name, updateMedalDto);

    return { data: updated };
  }

  @Delete(':name')
  async remove(@Param('name') name: string) {
    const deleted = await this.medalService.remove(name);

    return { data: deleted };
  }
}

@Controller("user_medal")
export class UserMedalController {
  constructor(
    private readonly medalService: MedalService,
    private readonly errorHandlingService: ErrorHandlingService,
  )

}
