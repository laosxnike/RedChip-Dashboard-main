/*
  Warnings:

  - Made the column `pageviews` on table `Dashboard` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sessions` on table `Dashboard` required. This step will fail if there are existing NULL values in that column.
  - Made the column `users` on table `Dashboard` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Dashboard" ALTER COLUMN "totalFollowers" SET DEFAULT 0,
ALTER COLUMN "newFollowers" SET DEFAULT 0,
ALTER COLUMN "engagementRate" SET DEFAULT 0.0,
ALTER COLUMN "dailyAverageNewFollowers" SET DEFAULT 0,
ALTER COLUMN "qrCodeEngagement" SET DEFAULT 0,
ALTER COLUMN "totalPosts" SET DEFAULT 0,
ALTER COLUMN "averageLikes" SET DEFAULT 0,
ALTER COLUMN "followersChartData" SET DEFAULT '{}',
ALTER COLUMN "engagementRateChartData" SET DEFAULT '{}',
ALTER COLUMN "adImpressionsChartData" SET DEFAULT '{}',
ALTER COLUMN "ctrChartData" SET DEFAULT '{}',
ALTER COLUMN "platformInsightsChartData" SET DEFAULT '{}',
ALTER COLUMN "pageviews" SET NOT NULL,
ALTER COLUMN "pageviews" SET DEFAULT 0,
ALTER COLUMN "sessions" SET NOT NULL,
ALTER COLUMN "sessions" SET DEFAULT 0,
ALTER COLUMN "users" SET NOT NULL,
ALTER COLUMN "users" SET DEFAULT 0;
