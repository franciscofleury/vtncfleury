-- CreateEnum
CREATE TYPE "Elos" AS ENUM ('Bronze', 'Prata', 'Ouro', 'Diamante', 'Sexo');

-- AlterTable
ALTER TABLE "UserToTitle" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "Medal" (
    "name" TEXT NOT NULL,
    "condition" TEXT NOT NULL,

    CONSTRAINT "Medal_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "UserMedal" (
    "medal_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "medal_name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "UserMedal_pkey" PRIMARY KEY ("medal_id")
);

-- AddForeignKey
ALTER TABLE "UserMedal" ADD CONSTRAINT "UserMedal_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMedal" ADD CONSTRAINT "UserMedal_medal_name_fkey" FOREIGN KEY ("medal_name") REFERENCES "Medal"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
