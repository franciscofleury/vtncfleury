import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
//import { UpdateUserDto } from './dto/update-user.dto';
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
    const userList = await this.prisma.user.findMany();

    return userList;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id: id },
    });

    return user;
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
