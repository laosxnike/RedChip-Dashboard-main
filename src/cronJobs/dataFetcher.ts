import cron from 'node-cron';
import { fetchAndStoreGoogleAnalyticsData } from '../services/googleAnalytics';
import { fetchInstagramData } from '../services/instagram';
import { YouTubeAnalyticsService } from '../services/youtubeAnalytics';
import { prisma } from '../../lib/prisma';

const formatDate = (date: Date) => date.toISOString().split('T')[0];

const dataFetcher = cron.schedule('0 * * * *', async () => {
  console.log('Running scheduled data fetch tasks every hour...');

  try {
    // YouTube Analytics
    const youtubeService = new YouTubeAnalyticsService();
    await youtubeService.initialize();

    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);

    const [channelStats, analytics] = await Promise.all([
      youtubeService.getChannelStats(),
      youtubeService.getLastWeekAnalytics()
    ]);

    // Create a new historical record instead of updating
    await prisma.dashboard.create({
      data: {
        fetchedAt: new Date(),
        youtubeViews: channelStats.viewCount,
        youtubeViewsGrowth: 0, // Will be calculated in the metrics API
        youtubeWatchTime: analytics.reduce((sum, day) => sum + day.estimatedMinutesWatched, 0),
        youtubeWatchTimeGrowth: 0,
        youtubeSubscribers: channelStats.subscriberCount,
        youtubeSubscribersGrowth: 0,
        youtubeAvgViewDuration: analytics[0]?.averageViewDuration || 0,
        youtubeAvgViewGrowth: 0,
        youtubeEngagementRate: analytics[0]?.likes ? (analytics[0].likes / analytics[0].views) * 100 : 0,
        youtubeEngagementGrowth: 0,
        youtubeNewVideos: channelStats.videoCount,
        youtubeNewVideosGrowth: 0,
        youtubeAnalyticsData: {
          data: analytics.map(day => ({
            date: day.date,
            views: day.views,
            estimatedMinutesWatched: day.estimatedMinutesWatched,
            averageViewDuration: day.averageViewDuration,
            subscribersGained: day.subscribersGained,
            likes: day.likes
          })),
          lastUpdated: new Date().toISOString()
        },
        clientId: process.env.CLIENT_ID || 'default_client_id',
        // Include other required fields with default values
        totalFollowers: 0,
        newFollowers: 0,
        engagementRate: 0,
        dailyAverageNewFollowers: 0,
        qrCodeEngagement: 0,
        totalPosts: 0,
        averageLikes: 0,
        updatedAt: new Date(),
        googleAnalyticsData: {},
        followersChartData: {},
        engagementRateChartData: {},
        adImpressionsChartData: {},
        ctrChartData: {},
        platformInsightsChartData: {},
        id: `youtube_${new Date().toISOString()}`, // Add unique ID
      }
    });

    console.log('✅ YouTube Analytics data stored.');
  } catch (error) {
    console.error('❌ Error storing YouTube Analytics data:', error);
  }
});

export default dataFetcher;