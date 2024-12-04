/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Client` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Dashboard" ADD COLUMN     "googleAnalyticsData" JSONB,
ADD COLUMN     "pageviews" INTEGER,
ADD COLUMN     "sessions" INTEGER,
ADD COLUMN     "users" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Client_name_key" ON "Client"("name");
