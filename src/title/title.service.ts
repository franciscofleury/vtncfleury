import { Injectable } from '@nestjs/common';
import { CreateTitleDto } from './dto/create-title.dto';
import { UpdateTitleDto } from './dto/update-title.dto';
import { Title, UserTitle } from '@prisma/client';
import { ErrorHandlingService } from '../services/error_handling.service';
import { PrismaService } from '../services/prisma.service';

declare type TitleOrError = Title | string;
declare type TitleListOrError = Title[] | string;
declare type UserTitleOrError = UserTitle | string;
@Injectable()
export class TitleService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly errorHandlingService: ErrorHandlingService,
  ) {}

  async create(createTitleDto: CreateTitleDto): Promise<TitleOrError> {
    let title;
    try {
      title = await this.prisma.client.title.create({
        data: createTitleDto,
      });
    } catch (e) {
      title = this.errorHandlingService.handlePrisma(e);
    }

    return title;
  }

  async findAll(): Promise<TitleListOrError> {
    let titleList;
    try {
      titleList = await this.prisma.client.title.findMany();
    } catch (e) {
      titleList = this.errorHandlingService.handlePrisma(e);
    }

    return titleList;
  }

  async findOne(titleName: string): Promise<TitleOrError> {
    let title;
    try {
      title = await this.prisma.client.title.findUnique({
        where: {
          title: titleName,
        },
      });
    } catch (e) {
      title = this.errorHandlingService.handlePrisma(e);
    }

    return title;
  }

  async update(
    titleName: string,
    updateTitleDto: UpdateTitleDto,
  ): Promise<TitleOrError> {
    let title;
    try {
      title = await this.prisma.client.title.update({
        where: {
          title: titleName,
        },
        data: updateTitleDto,
      });
    } catch (e) {
      title = this.errorHandlingService.handlePrisma(e);
    }

    return title;
  }

  async remove(titleName: string): Promise<TitleOrError> {
    let title;
    try {
      title = await this.prisma.client.title.delete({
        where: {
          title: titleName,
        },
      });
    } catch (e) {
      title = this.errorHandlingService.handlePrisma(e);
    }

    return title;
  }

  async concede(user_id: number, title: string): Promise<UserTitleOrError> {
    let result;
    try {
      result = await this.prisma.client.userTitle.create({
        data: {
          user_id,
          title,
          Valid: true,
          IsChosen: false,
        },
      });
    } catch (e) {
      result = this.errorHandlingService.handlePrisma(e);
    }

    return result;
  }
}
