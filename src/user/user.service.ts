import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/services/prisma.service';
import { User } from '@prisma/client';
import { ErrorHandlingService } from 'src/services/error_handling.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private errorHandlingService: ErrorHandlingService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, password } = createUserDto;

    let result;
    try {
      result = await this.prisma.user.create({
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

  async findAll(): Promise<User[]> {
    let result;
    try {
      result = await this.prisma.user.findMany();
    } catch (e) {
      result = this.errorHandlingService.handlePrisma(e);
    }

    return result;
  }

  async findOne(id: number): Promise<User> {
    let user;
    try {
      user = await this.prisma.user.findUnique({
        where: { id: id },
      });
    } catch (e) {
      user = this.errorHandlingService.handlePrisma(e);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    let user;
    try {
      user = await this.prisma.user.update({
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

  async remove(id: number) {
    let result;
    try {
      result = await this.prisma.user.delete({
        where: {
          id: id,
        },
      });
    } catch (e) {
      result = this.errorHandlingService.handlePrisma(e);
    }

    return result;
  }
}
