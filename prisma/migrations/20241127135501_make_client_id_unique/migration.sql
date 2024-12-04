/*
  Warnings:

  - A unique constraint covering the columns `[clientId]` on the table `Dashboard` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Dashboard_clientId_key" ON "Dashboard"("clientId");
