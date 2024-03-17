/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userEmail` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userFirstname` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userLastname` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userPassword` on the `User` table. All the data in the column will be lost.
  - Added the required column `user_email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_firstname` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_lastname` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_userEmail_key";

-- DropIndex
DROP INDEX "User_userId_key";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "userEmail",
DROP COLUMN "userFirstname",
DROP COLUMN "userId",
DROP COLUMN "userLastname",
DROP COLUMN "userPassword",
ADD COLUMN     "user_email" TEXT NOT NULL,
ADD COLUMN     "user_firstname" TEXT NOT NULL,
ADD COLUMN     "user_id" UUID NOT NULL,
ADD COLUMN     "user_lastname" TEXT NOT NULL,
ADD COLUMN     "user_password" TEXT NOT NULL,
ADD COLUMN     "user_registered_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("user_id");
