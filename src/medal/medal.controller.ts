import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MedalService } from './medal.service';
import { CreateMedalDto } from './dto/create-medal.dto';
import { UpdateMedalDto } from './dto/update-medal.dto';

@Controller('medal')
export class MedalController {
  constructor(private readonly medalService: MedalService) {}

  // USERMEDAL ENDPOINTS
  @Get('info')
  async findUserMedal(
    @Query('user_id') user_id: string,
    @Query('medal') medal_name: string,
  ) {
    const userMedal = await this.medalService.getMedalInfo(
      +user_id,
      medal_name,
    );

    return { data: userMedal };
  }

  @Post('award')
  async awardUser(
    @Body('user_id') user_id: number,
    @Body('medal') medal_name: string,
  ) {
    const medalInstance = await this.medalService.award(user_id, medal_name);

    return { data: medalInstance };
  }

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
    const medal = await this.medalService.findOne(name);

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
