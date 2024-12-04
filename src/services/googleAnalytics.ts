import dotenv from 'dotenv';
import { prisma } from '../../lib/prisma';
import api from '../../lib/api';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

dotenv.config();

/**
 * Fetches Google Analytics data for the specified date range and stores it in the database.
 * @param startDate - The start date for the data fetching (YYYY-MM-DD)
 * @param endDate - The end date for the data fetching (YYYY-MM-DD)
 */
export async function fetchAndStoreGoogleAnalyticsData(startDate: string, endDate: string) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL!,
        private_key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
    });

    const authClient = await auth.getClient();
    const oauth2Client: OAuth2Client = authClient as OAuth2Client;
    const propertyId = process.env.GA_PROPERTY_ID;

    if (!propertyId) {
      throw new Error('GA_PROPERTY_ID is not set in environment variables');
    }

    const analytics = google.analyticsdata({
      version: 'v1beta',
      auth: oauth2Client,
    });

    // Get current week's data
    const currentWeekResponse = await analytics.properties.runReport({
      property: `properties/${propertyId}`,
      requestBody: {
        dateRanges: [{
          startDate: '7daysAgo',
          endDate: 'today'
        }],
        metrics: [
          { name: 'sessions' },
          { name: 'newUsers' },
          { name: 'screenPageViews' },
          { name: 'engagementRate' },
          { name: 'averageSessionDuration' },
          { name: 'bounceRate' },
          { name: 'eventCount' }
        ],
      },
    });

    // Get previous week's data for comparison
    const previousWeekResponse = await analytics.properties.runReport({
      property: `properties/${propertyId}`,
      requestBody: {
        dateRanges: [{
          startDate: '14daysAgo',
          endDate: '8daysAgo'
        }],
        metrics: [
          { name: 'sessions' },
          { name: 'newUsers' },
          { name: 'screenPageViews' },
          { name: 'engagementRate' },
          { name: 'averageSessionDuration' },
          { name: 'bounceRate' },
          { name: 'eventCount' }
        ],
      },
    });

    // Extract current week metrics
    const currentMetrics = currentWeekResponse.data.rows?.[0]?.metricValues || [];
    const sessions = parseInt(currentMetrics[0]?.value || '0', 10);
    const newUsers = parseInt(currentMetrics[1]?.value || '0', 10);
    const pageviews = parseInt(currentMetrics[2]?.value || '0', 10);
    const engagementRate = parseFloat(currentMetrics[3]?.value || '0');

    // Extract previous week metrics for comparison
    const previousMetrics = previousWeekResponse.data.rows?.[0]?.metricValues || [];
    const previousSessions = parseInt(previousMetrics[0]?.value || '0', 10);
    const previousNewUsers = parseInt(previousMetrics[1]?.value || '0', 10);
    const previousPageviews = parseInt(previousMetrics[2]?.value || '0', 10);
    const previousEngagementRate = parseFloat(previousMetrics[3]?.value || '0');

    // Calculate trends
    const calculateTrend = (current: number, previous: number) => {
      if (!previous) return { value: '0%', trend: 'up' as const };
      const percentChange = ((current - previous) / previous) * 100;
      return {
        value: `${Math.abs(percentChange).toFixed(1)}%`,
        trend: percentChange >= 0 ? 'up' as const : 'down' as const
      };
    };

    // Upsert the fetched data into the Dashboard table
    await prisma.dashboard.upsert({
      where: {
        id: 'default_dashboard_id',
      },
      update: {
        sessions,
        newUsers,
        pageviews,
        engagementRate,
        googleAnalyticsData: {
          sessions,
          newUsers,
          pageviews,
          engagementRate,
          trends: {
            engagementRate: calculateTrend(engagementRate, previousEngagementRate),
            newUsers: calculateTrend(newUsers, previousNewUsers),
            pageviews: calculateTrend(pageviews, previousPageviews)
          },
          fetchedAt: new Date(),
        },
        updatedAt: new Date(),
      },
      create: {
        id: 'default_dashboard_id',
        sessions,
        newUsers,
        pageviews,
        engagementRate,
        googleAnalyticsData: {
          sessions,
          newUsers,
          pageviews,
          engagementRate,
          trends: {
            engagementRate: calculateTrend(engagementRate, previousEngagementRate),
            newUsers: calculateTrend(newUsers, previousNewUsers),
            pageviews: calculateTrend(pageviews, previousPageviews)
          },
          fetchedAt: new Date(),
        },
        clientId: 'default_client_id',
        totalFollowers: 0,
        newFollowers: 0,
        dailyAverageNewFollowers: 0,
        qrCodeEngagement: 0,
        totalPosts: 0,
        averageLikes: 0,
        followersChartData: {},
        engagementRateChartData: {},
        adImpressionsChartData: {},
        ctrChartData: {},
        platformInsightsChartData: {},
        updatedAt: new Date(),
      },
    });

    console.log('✅ Google Analytics data upserted successfully.');
  } catch (error) {
    console.error('❌ Error in fetchAndStoreGoogleAnalyticsData:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getGoogleAnalyticsData(startDate: string, endDate: string) {
  // Your implementation here
}

export const fetchGoogleAnalyticsData = async (startDate: string, endDate: string) => {
  try {
    const response = await api.get(`/google-analytics?startDate=${startDate}&endDate=${endDate}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Google Analytics data:', error);
    throw error;
  }
};