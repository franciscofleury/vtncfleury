/*
  Warnings:

  - You are about to drop the column `elo` on the `UserMedal` table. All the data in the column will be lost.
  - You are about to drop the column `level` on the `UserMedal` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserMedal" DROP COLUMN "elo",
DROP COLUMN "level",
ADD COLUMN     "total_level" INTEGER NOT NULL DEFAULT 0;
