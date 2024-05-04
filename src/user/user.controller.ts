import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('medal/:user_id')
  async medalProgress(@Param('user_id') user_id: number) {
    const user_medal_list = await this.userService.getMedals(user_id);

    return { data: user_medal_list };
  }

  @Get('title/:user_id')
  async titleProgress(@Param('user_id') user_id: number) {
    const user_title_list = await this.userService.getTitles(+user_id);

    return { data: user_title_list };
  }
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
}
