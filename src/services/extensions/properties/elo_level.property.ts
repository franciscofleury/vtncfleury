import { UserMedal } from '@prisma/client';

export const EloLevelProperty = {
  needs: { total_level: true },
  compute(userMedal: UserMedal) {
    return userMedal.total_level % 5;
  },
};
