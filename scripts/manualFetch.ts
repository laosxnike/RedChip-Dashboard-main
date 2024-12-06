   // scripts/manualFetch.ts
   import dotenv from 'dotenv';
   import { fetchAndStoreGoogleAnalyticsData } from '../src/services/googleAnalytics.js';
   import { YouTubeAnalyticsService, YouTubeAnalyticsData } from '../src/services/youtubeAnalytics';
   import { prisma } from '../lib/prisma';
   
   dotenv.config();
   
   function calculateGrowth(current: number, previous: number): number {
     if (previous === 0) return 0;
     return ((current - previous) / previous) * 100;
   }

   function calculateEngagementRate(data: YouTubeAnalyticsData): number {
     if (!data || data.views === 0) return 0;
     return ((data.likes + data.comments) / data.views) * 100;
   }
   
   async function manualFetch() {
     try {
       if (!process.env.CLIENT_ID) {
         throw new Error('CLIENT_ID environment variable is required');
       }

       // Google Analytics
       const gaStartDate = '2023-01-01';
       const gaEndDate = '2023-12-31';
       
       await fetchAndStoreGoogleAnalyticsData(gaStartDate, gaEndDate);
       console.log('✅ Google Analytics fetch and store completed successfully.');

       // YouTube Analytics
       const youtubeService = new YouTubeAnalyticsService();
       await youtubeService.initialize();

       const endDate = new Date().toISOString().split('T')[0];
       const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

       // Get channel stats and analytics in parallel
       const [channelStats, analytics] = await Promise.all([
         youtubeService.getChannelStats(),
         youtubeService.getAnalytics(startDate, endDate)
       ]);

       // Update dashboard with the fetched metrics
       await prisma.dashboard.upsert({
         where: { 
           clientId: process.env.CLIENT_ID 
         },
         create: {
           clientId: process.env.CLIENT_ID,
           youtubeSubscribers: channelStats.subscriberCount,
           youtubeViews: channelStats.viewCount,
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
           googleAnalyticsData: { data: [], lastUpdated: new Date().toISOString() },
           totalFollowers: 0,
           newFollowers: 0,
           engagementRate: 0,
           dailyAverageNewFollowers: 0,
           qrCodeEngagement: 0,
           totalPosts: 0,
           averageLikes: 0,
           updatedAt: new Date()
         },
         update: {
           youtubeSubscribers: channelStats.subscriberCount,
           youtubeViews: channelStats.viewCount,
           youtubeViewsGrowth: calculateGrowth(
             analytics.reduce((sum, day) => sum + day.views, 0),
             analytics.slice(-7).reduce((sum, day) => sum + day.views, 0)
           ),
           youtubeWatchTime: analytics.reduce((sum, day) => sum + day.estimatedMinutesWatched, 0),
           youtubeWatchTimeGrowth: calculateGrowth(
             analytics.reduce((sum, day) => sum + day.estimatedMinutesWatched, 0),
             analytics.slice(-7).reduce((sum, day) => sum + day.estimatedMinutesWatched, 0)
           ),
           youtubeAvgViewDuration: analytics[0]?.averageViewDuration || 0,
           youtubeAvgViewGrowth: calculateGrowth(
             analytics[0]?.averageViewDuration || 0,
             analytics[7]?.averageViewDuration || 0
           ),
           youtubeSubscribersGrowth: analytics.reduce((sum, day) => sum + day.subscribersGained - (day.subscribersLost || 0), 0),
           youtubeEngagementRate: calculateEngagementRate(analytics[0]),
           youtubeEngagementGrowth: calculateGrowth(
             calculateEngagementRate(analytics[0]),
             calculateEngagementRate(analytics[7])
           ),
           youtubeNewVideos: channelStats.videoCount,
           youtubeNewVideosGrowth: 0, // This needs to be calculated from historical data
           youtubeAnalyticsData: {
             data: analytics.map(day => ({
               date: day.date,
               views: day.views,
               estimatedMinutesWatched: day.estimatedMinutesWatched,
               averageViewDuration: day.averageViewDuration,
               subscribersGained: day.subscribersGained,
               subscribersLost: day.subscribersLost,
               likes: day.likes
             })),
             lastUpdated: new Date().toISOString()
           },
           updatedAt: new Date()
         }
       });

       console.log('✅ YouTube Analytics fetch and store completed successfully.');
     } catch (error) {
       console.error('❌ Manual fetch failed:', error);
     } finally {
       await prisma.$disconnect();
     }
   }
   
   manualFetch();