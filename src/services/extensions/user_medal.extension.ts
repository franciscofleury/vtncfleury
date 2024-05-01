import { Prisma } from '@prisma/client';
import { awardMedal } from './methods/award_medal';
import { EloProperty } from './properties/elo.property';
import { EloLevelProperty } from './properties/elo_level.property';

export const GetUserMedalMethodsExtension = () => {
  return Prisma.defineExtension({
    model: {
      userMedal: {
        awardMedal,
      },
    },
  });
};

export const GetUserMedalPropertyExtension = () => {
  return Prisma.defineExtension({
    result: {
      userMedal: {
        elo: EloProperty,
        elo_level: EloLevelProperty,
      },
    },
  });
};
