/*
  Warnings:

  - The primary key for the `UserMedal` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `UserMedal` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `UserMedal` table. All the data in the column will be lost.
  - You are about to drop the column `medal_id` on the `UserMedal` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserMedal" DROP CONSTRAINT "UserMedal_medal_name_fkey";

-- DropForeignKey
ALTER TABLE "UserMedal" DROP CONSTRAINT "UserMedal_user_id_fkey";

-- AlterTable
ALTER TABLE "UserMedal" DROP CONSTRAINT "UserMedal_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "deletedAt",
DROP COLUMN "medal_id",
ADD CONSTRAINT "UserMedal_pkey" PRIMARY KEY ("user_id", "medal_name");

-- CreateTable
CREATE TABLE "MedalInstance" (
    "medal_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "medal_name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "userId" INTEGER,
    "medalName" TEXT,

    CONSTRAINT "MedalInstance_pkey" PRIMARY KEY ("medal_id")
);

-- AddForeignKey
ALTER TABLE "MedalInstance" ADD CONSTRAINT "MedalInstance_user_id_medal_name_fkey" FOREIGN KEY ("user_id", "medal_name") REFERENCES "UserMedal"("user_id", "medal_name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedalInstance" ADD CONSTRAINT "MedalInstance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedalInstance" ADD CONSTRAINT "MedalInstance_medalName_fkey" FOREIGN KEY ("medalName") REFERENCES "Medal"("name") ON DELETE SET NULL ON UPDATE CASCADE;
