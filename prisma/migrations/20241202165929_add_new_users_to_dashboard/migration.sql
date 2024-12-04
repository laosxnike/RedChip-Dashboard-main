/*
  Warnings:

  - Made the column `googleAnalyticsData` on table `Dashboard` required. This step will fail if there are existing NULL values in that column.
  - Made the column `pageviews` on table `Dashboard` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sessions` on table `Dashboard` required. This step will fail if there are existing NULL values in that column.
  - Made the column `users` on table `Dashboard` required. This step will fail if there are existing NULL values in that column.

*/

-- Step 1: Add new columns with default values
ALTER TABLE "Dashboard" 
  ADD COLUMN "fetchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE "Dashboard" 
  ADD COLUMN "newUsers" INTEGER NOT NULL DEFAULT 0;

-- Step 2: Set default values for existing columns
ALTER TABLE "Dashboard" 
  ALTER COLUMN "totalFollowers" SET DEFAULT 0;

ALTER TABLE "Dashboard" 
  ALTER COLUMN "newFollowers" SET DEFAULT 0;

ALTER TABLE "Dashboard" 
  ALTER COLUMN "engagementRate" SET DEFAULT 0;

ALTER TABLE "Dashboard" 
  ALTER COLUMN "dailyAverageNewFollowers" SET DEFAULT 0;

ALTER TABLE "Dashboard" 
  ALTER COLUMN "dailyAverageNewFollowers" SET DATA TYPE DOUBLE PRECISION;

ALTER TABLE "Dashboard" 
  ALTER COLUMN "qrCodeEngagement" SET DEFAULT 0;

ALTER TABLE "Dashboard" 
  ALTER COLUMN "totalPosts" SET DEFAULT 0;

ALTER TABLE "Dashboard" 
  ALTER COLUMN "averageLikes" SET DEFAULT 0;

ALTER TABLE "Dashboard" 
  ALTER COLUMN "averageLikes" SET DATA TYPE DOUBLE PRECISION;

-- Step 3: Drop NOT NULL constraints where necessary
ALTER TABLE "Dashboard" 
  ALTER COLUMN "followersChartData" DROP NOT NULL;

ALTER TABLE "Dashboard" 
  ALTER COLUMN "engagementRateChartData" DROP NOT NULL;

ALTER TABLE "Dashboard" 
  ALTER COLUMN "adImpressionsChartData" DROP NOT NULL;

ALTER TABLE "Dashboard" 
  ALTER COLUMN "ctrChartData" DROP NOT NULL;

ALTER TABLE "Dashboard" 
  ALTER COLUMN "platformInsightsChartData" DROP NOT NULL;

-- Step 4: Update existing NULL values to prevent NOT NULL constraint failure
UPDATE "Dashboard" 
  SET "googleAnalyticsData" = '{}' 
  WHERE "googleAnalyticsData" IS NULL;

UPDATE "Dashboard" 
  SET "pageviews" = 0 
  WHERE "pageviews" IS NULL;

UPDATE "Dashboard" 
  SET "sessions" = 0 
  WHERE "sessions" IS NULL;

UPDATE "Dashboard" 
  SET "users" = 0 
  WHERE "users" IS NULL;

-- Step 5: Alter existing columns to set them as NOT NULL and set defaults
ALTER TABLE "Dashboard" 
  ALTER COLUMN "googleAnalyticsData" SET NOT NULL;

ALTER TABLE "Dashboard" 
  ALTER COLUMN "pageviews" SET NOT NULL;

ALTER TABLE "Dashboard" 
  ALTER COLUMN "pageviews" SET DEFAULT 0;

ALTER TABLE "Dashboard" 
  ALTER COLUMN "sessions" SET NOT NULL;

ALTER TABLE "Dashboard" 
  ALTER COLUMN "sessions" SET DEFAULT 0;

ALTER TABLE "Dashboard" 
  ALTER COLUMN "users" SET NOT NULL;

ALTER TABLE "Dashboard" 
  ALTER COLUMN "users" SET DEFAULT 0;

-- Step 6: Drop default from updatedAt
ALTER TABLE "Dashboard" 
  ALTER COLUMN "updatedAt" DROP DEFAULT;
