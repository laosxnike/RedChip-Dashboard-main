/*
  Warnings:

  - A unique constraint covering the columns `[clientId]` on the table `Dashboard` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "likes" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "Dashboard_clientId_key" ON "Dashboard"("clientId");
