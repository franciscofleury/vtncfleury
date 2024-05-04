/*
  Warnings:

  - You are about to drop the `UserToTitle` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MedalInstance" DROP CONSTRAINT "MedalInstance_user_id_medal_name_fkey";

-- DropForeignKey
ALTER TABLE "UserMedal" DROP CONSTRAINT "UserMedal_medal_name_fkey";

-- DropForeignKey
ALTER TABLE "UserToTitle" DROP CONSTRAINT "UserToTitle_title_fkey";

-- DropForeignKey
ALTER TABLE "UserToTitle" DROP CONSTRAINT "UserToTitle_user_id_fkey";

-- DropTable
DROP TABLE "UserToTitle";

-- CreateTable
CREATE TABLE "UserTitle" (
    "user_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "IsChosen" BOOLEAN NOT NULL,
    "Valid" BOOLEAN NOT NULL,

    CONSTRAINT "UserTitle_pkey" PRIMARY KEY ("user_id","title")
);

-- AddForeignKey
ALTER TABLE "UserTitle" ADD CONSTRAINT "UserTitle_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTitle" ADD CONSTRAINT "UserTitle_title_fkey" FOREIGN KEY ("title") REFERENCES "Title"("title") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedalInstance" ADD CONSTRAINT "MedalInstance_user_id_medal_name_fkey" FOREIGN KEY ("user_id", "medal_name") REFERENCES "UserMedal"("user_id", "medal_name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMedal" ADD CONSTRAINT "UserMedal_medal_name_fkey" FOREIGN KEY ("medal_name") REFERENCES "Medal"("name") ON DELETE CASCADE ON UPDATE CASCADE;
