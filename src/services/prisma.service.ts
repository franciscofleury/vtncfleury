import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import {
  GetUserMedalMethodsExtension,
  GetUserMedalPropertyExtension,
} from './extensions/user_medal.extension';

@Injectable()
export class PrismaService implements OnModuleInit {
  private clean_prisma: PrismaClient = new PrismaClient();
  private extended_prisma;

  async onModuleInit() {
    this.extended_prisma = this.clean_prisma
      .$extends(GetUserMedalPropertyExtension())
      .$extends(GetUserMedalMethodsExtension());
    await this.extended_prisma.$connect();
  }

  public get client() {
    return this.extended_prisma;
  }
}
