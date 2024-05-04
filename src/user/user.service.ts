import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/services/prisma.service';
import { User } from '@prisma/client';
import { ErrorHandlingService } from 'src/services/error_handling.service';

declare type UserOrError = User | string;
declare type UserListOrError = User[] | string;
declare type UserMedalListOrError = UserMedal[] | string;

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly errorHandlingService: ErrorHandlingService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserOrError> {
    const { name, email, password } = createUserDto;

    let result;
    try {
      result = await this.prisma.client.user.create({
        data: {
          name,
          email,
          password,
        },
      });
    } catch (e) {
      result = this.errorHandlingService.handlePrisma(e);
    }

    return result;
  }

  async findAll(): Promise<UserListOrError> {
    let result;
    try {
      result = await this.prisma.client.user.findMany();
    } catch (e) {
      result = this.errorHandlingService.handlePrisma(e);
    }

    return result;
  }

  async findOne(id: number): Promise<UserOrError> {
    let user;
    try {
      user = await this.prisma.client.user.findUnique({
        where: { id: id },
      });
    } catch (e) {
      user = this.errorHandlingService.handlePrisma(e);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserOrError> {
    let user;
    try {
      user = await this.prisma.client.user.update({
        where: {
          id: id,
        },
        data: updateUserDto,
      });
    } catch (e) {
      user = this.errorHandlingService.handlePrisma(e);
    }
    return user;
  }

  async remove(id: number): Promise<UserOrError> {
    let result;
    try {
      result = await this.prisma.client.user.delete({
        where: {
          id: id,
        },
      });
    } catch (e) {
      result = this.errorHandlingService.handlePrisma(e);
    }

    return result;
  }

  async getMedals(id: number): Promise<UserMedalListOrError> {
    let user_medals;
    try {
      user_medals = await this.prisma.client.userMedal.findMany({
        where: {
          user_id: id,
        },
      });
    } catch (e) {
      user_medals = this.errorHandlingService.handlePrisma(e);
    }

    return user_medals;
  }
}
