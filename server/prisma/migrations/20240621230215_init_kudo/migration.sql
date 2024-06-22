/*
  Warnings:

  - You are about to drop the column `authorId` on the `KudoCard` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `Kudoboard` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "KudoCard" DROP COLUMN "authorId";

-- AlterTable
ALTER TABLE "Kudoboard" DROP COLUMN "authorId";
