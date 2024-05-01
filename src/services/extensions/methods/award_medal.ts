import { MedalInstance, PrismaClient } from '@prisma/client';
import { PrismaError } from 'src/services/error_handling.service';

declare type MedalInstanceOrPrismaError = MedalInstance | PrismaError;

export const awardMedal = async (
  user_id: number,
  medal_name: string,
): Promise<MedalInstanceOrPrismaError> => {
  let result;
  const prisma = new PrismaClient();
  try {
    const user_medal_element = await prisma.userMedal.upsert({
      where: {
        user_id_medal_name: {
          user_id,
          medal_name,
        },
      },
      update: {
        total_level: { increment: 1 },
      },
      create: {
        user_id,
        medal_name,
        total_level: 1,
      },
    });

    result = await prisma.medalInstance.create({
      data: {
        user_id: user_medal_element.user_id,
        medal_name: user_medal_element.medal_name,
      },
    });
  } catch (e) {
    result = e;
  }

  return result;
};
