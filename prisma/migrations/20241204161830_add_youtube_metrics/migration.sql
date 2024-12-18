-- AlterTable
ALTER TABLE "Dashboard" ADD COLUMN     "youtubeAnalyticsData" JSONB,
ADD COLUMN     "youtubeAvgViewDuration" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "youtubeAvgViewGrowth" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "youtubeEngagementGrowth" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "youtubeEngagementRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "youtubeNewVideos" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "youtubeNewVideosGrowth" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "youtubeSubscribers" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "youtubeSubscribersGrowth" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "youtubeViews" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "youtubeViewsGrowth" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "youtubeWatchTime" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "youtubeWatchTimeGrowth" DOUBLE PRECISION NOT NULL DEFAULT 0;
