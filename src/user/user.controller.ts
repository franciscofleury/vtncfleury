import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);

    return { data: user };
  }

  @Get()
  async findAll() {
    const users = await this.userService.findAll();

    return { data: users };
  }

  @Get('medal')
  async getMedal(
    @Query('user_id') user_id: string,
    @Query('medal_name') medal_name: string,
  ) {
    const userMedal = await this.userService.getMedalInfo(+user_id, medal_name);

    return { data: userMedal };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(+id);

    return { data: user };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.userService.update(+id, updateUserDto);

    return { data: user };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const user = await this.userService.remove(+id);

    return { data: user };
  }

  // Award funciton should be moved to medal resource
  @Post('award')
  async award(
    @Query('medal_name') medal_name: string,
    @Query('user_id') user_id: string,
  ) {
    const userMedal = await this.userService.award(+user_id, medal_name);

    return { data: userMedal };
  }
}
