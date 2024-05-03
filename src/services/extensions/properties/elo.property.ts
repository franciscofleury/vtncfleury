import { UserMedal } from '@prisma/client';

export const EloProperty = {
  needs: { total_level: true },
  compute(userMedal: UserMedal) {
    return Math.floor(userMedal.total_level / 5);
  },
};
