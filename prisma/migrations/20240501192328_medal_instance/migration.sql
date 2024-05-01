/*
  Warnings:

  - You are about to drop the column `medalName` on the `MedalInstance` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `MedalInstance` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "MedalInstance" DROP CONSTRAINT "MedalInstance_medalName_fkey";

-- DropForeignKey
ALTER TABLE "MedalInstance" DROP CONSTRAINT "MedalInstance_userId_fkey";

-- AlterTable
ALTER TABLE "MedalInstance" DROP COLUMN "medalName",
DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "UserMedal" ADD COLUMN     "elo" "Elos" NOT NULL DEFAULT 'Bronze',
ADD COLUMN     "level" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "UserMedal" ADD CONSTRAINT "UserMedal_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMedal" ADD CONSTRAINT "UserMedal_medal_name_fkey" FOREIGN KEY ("medal_name") REFERENCES "Medal"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
