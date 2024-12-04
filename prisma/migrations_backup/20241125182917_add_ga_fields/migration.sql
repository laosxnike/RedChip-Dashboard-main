-- AlterTable
ALTER TABLE "Dashboard" ADD COLUMN     "googleAnalyticsData" JSONB,
ADD COLUMN     "pageviews" INTEGER,
ADD COLUMN     "sessions" INTEGER,
ADD COLUMN     "users" INTEGER;
