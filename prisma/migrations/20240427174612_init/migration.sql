-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserToTitle" (
    "user_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "IsChosen" BOOLEAN NOT NULL,
    "Valid" BOOLEAN NOT NULL,

    CONSTRAINT "UserToTitle_pkey" PRIMARY KEY ("user_id","title")
);

-- CreateTable
CREATE TABLE "Title" (
    "title" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Title_pkey" PRIMARY KEY ("title")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "UserToTitle" ADD CONSTRAINT "UserToTitle_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserToTitle" ADD CONSTRAINT "UserToTitle_title_fkey" FOREIGN KEY ("title") REFERENCES "Title"("title") ON DELETE RESTRICT ON UPDATE CASCADE;
