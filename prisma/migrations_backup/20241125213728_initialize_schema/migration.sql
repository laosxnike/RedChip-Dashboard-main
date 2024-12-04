/*
  Warnings:

  - You are about to drop the column `googleAnalyticsData` on the `Dashboard` table. All the data in the column will be lost.
  - You are about to drop the column `pageviews` on the `Dashboard` table. All the data in the column will be lost.
  - You are about to drop the column `sessions` on the `Dashboard` table. All the data in the column will be lost.
  - You are about to drop the column `users` on the `Dashboard` table. All the data in the column will be lost.
  - You are about to drop the `Kpi` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Client` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Dashboard" DROP COLUMN "googleAnalyticsData",
DROP COLUMN "pageviews",
DROP COLUMN "sessions",
DROP COLUMN "users",
ALTER COLUMN "totalFollowers" DROP DEFAULT,
ALTER COLUMN "newFollowers" DROP DEFAULT,
ALTER COLUMN "engagementRate" DROP DEFAULT,
ALTER COLUMN "dailyAverageNewFollowers" DROP DEFAULT,
ALTER COLUMN "qrCodeEngagement" DROP DEFAULT,
ALTER COLUMN "totalPosts" DROP DEFAULT,
ALTER COLUMN "averageLikes" DROP DEFAULT,
ALTER COLUMN "followersChartData" DROP DEFAULT,
ALTER COLUMN "engagementRateChartData" DROP DEFAULT,
ALTER COLUMN "adImpressionsChartData" DROP DEFAULT,
ALTER COLUMN "ctrChartData" DROP DEFAULT,
ALTER COLUMN "platformInsightsChartData" DROP DEFAULT;

-- DropTable
DROP TABLE "Kpi";

-- CreateTable
CREATE TABLE "KPI" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "KPI_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_name_key" ON "Client"("name");
