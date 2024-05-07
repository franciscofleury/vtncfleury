import { Injectable } from '@nestjs/common';
import { CreateMedalDto } from './dto/create-medal.dto';
import { UpdateMedalDto } from './dto/update-medal.dto';
import { ErrorHandlingService } from 'src/services/error_handling.service';
import { PrismaService } from 'src/services/prisma.service';
import { Medal } from '@prisma/client';

declare type MedalOrError = Medal | string;
declare type MedalListOrError = Medal[] | string;

@Injectable()
export class MedalService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly errorHandlingService: ErrorHandlingService,
  ) {}
  async create(createMedalDto: CreateMedalDto): Promise<MedalOrError> {
    let medal_result;
    try {
      medal_result = await this.prisma.client.medal.create({
        data: createMedalDto,
      });
    } catch (e) {
      medal_result = this.errorHandlingService.handlePrisma(e);
    }

    return medal_result;
  }

  async findAll(): Promise<MedalListOrError> {
    let medal_list;
    try {
      medal_list = await this.prisma.client.medal.findMany();
    } catch (e) {
      medal_list = this.errorHandlingService.handlePrisma(e);
    }

    return medal_list;
  }

  async findOne(name: string): Promise<MedalOrError> {
    let medal_result;
    try {
      medal_result = await this.prisma.client.medal.findUnique({
        where: {
          name,
        },
      });
    } catch (e) {
      medal_result = this.errorHandlingService.handlePrisma(e);
    }

    return medal_result;
  }

  async update(medal_name: string, updateMedalDto: UpdateMedalDto) {
    let medal_result;
    try {
      medal_result = await this.prisma.client.medal.update({
        where: {
          name: medal_name,
        },
        data: updateMedalDto,
      });
    } catch (e) {
      medal_result = this.errorHandlingService.handlePrisma(e);
    }

    return medal_result;
  }

  async remove(medal_name: string): Promise<MedalOrError> {
    let medal_result;
    try {
      medal_result = await this.prisma.client.medal.delete({
        where: {
          name: medal_name,
        },
      });
    } catch (e) {
      console.log(e);
      medal_result = this.errorHandlingService.handlePrisma(e);
    }

    return medal_result;
  }

  async award(user_id: number, medal_name: string) {
    let result;
    try {
      result = await this.prisma.client.userMedal.awardMedal(
        user_id,
        medal_name,
      );
    } catch (e) {
      result = this.errorHandlingService.handlePrisma(e);
    }

    return result;
  }

  async getUserMedalInfo(user_id: number, medal_name: string) {
    let result;
    try {
      result = await this.prisma.client.userMedal.upsert({
        where: {
          user_id_medal_name: {
            user_id,
            medal_name,
          },
        },
        update: {},
        create: {
          user_id,
          medal_name,
        },
      });
    } catch (e) {
      result = this.errorHandlingService.handlePrisma(e);
    }

    return result;
  }

  async getMedalInfo(medal_name: string) {
    let user_medal_list;
    try {
      user_medal_list = await this.prisma.client.userMedal.findMany({
        where: {
          medal_name,
        },
      });
    } catch (e) {
      user_medal_list = this.errorHandlingService.handlePrisma(e);
    }

    return user_medal_list;
  }
}
