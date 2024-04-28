import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TitleService } from './title.service';
import { CreateTitleDto } from './dto/create-title.dto';
import { UpdateTitleDto } from './dto/update-title.dto';

@Controller('title')
export class TitleController {
  constructor(private readonly titleService: TitleService) {}

  @Post()
  async create(@Body() createTitleDto: CreateTitleDto) {
    const title_element = await this.titleService.create(createTitleDto);

    return { data: title_element };
  }

  @Get()
  async findAll() {
    const title_list = await this.titleService.findAll();

    return { data: title_list };
  }

  @Get(':titleName')
  async findOne(@Param('titleName') titleName: string) {
    const title_element = await this.titleService.findOne(titleName);

    return { data: title_element };
  }

  @Patch(':titleName')
  async update(
    @Param('titleName') titleName: string,
    @Body() updateTitleDto: UpdateTitleDto,
  ) {
    const title_element = await this.titleService.update(
      titleName,
      updateTitleDto,
    );

    return { data: title_element };
  }

  @Delete(':titleName')
  async remove(@Param('titleName') titleName: string) {
    const title_element = await this.titleService.remove(titleName);

    return { data: title_element };
  }
}
