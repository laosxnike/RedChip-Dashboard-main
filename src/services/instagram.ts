import api from '../../lib/api';
import { prisma } from '../../lib/prisma';

const INSTAGRAM_BUSINESS_ACCOUNT_ID = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID || '';

interface InstagramData {
  reach: number;
  impressions: number;
  profileViews: number;
  recentMedia: any[];
  totalFollowers: number;
}

export async function fetchInstagramFollowers() {
  try {
    const response = await api.get(`/${INSTAGRAM_BUSINESS_ACCOUNT_ID}`, {
      params: {
        fields: 'followers_count',
      },
    });
    return response.data.followers_count;
  } catch (error) {
    console.error('Error fetching Instagram followers:', error);
    throw error;
  }
}

export async function fetchInstagramData(): Promise<InstagramData> {
  try {
    const [reach, impressions, profileViews, media, followers] = await Promise.all([
      fetchInstagramInsights('reach'),
      fetchInstagramInsights('impressions'),
      fetchInstagramInsights('profile_views'),
      fetchInstagramMedia(5),
      fetchInstagramFollowers(),
    ]);

    // Upsert data into the Dashboard model
    await prisma.dashboard.upsert({
      where: { id: 'default_dashboard_id' },
      update: {
        followersChartData: { ...reach, ...impressions },
        googleAnalyticsData: { ...profileViews },
      },
      create: {
        id: 'default_dashboard_id',
        googleAnalyticsData: {
          reach,
          impressions,
          profileViews,
          recentMedia: media,
          totalFollowers: followers,
        },
        clientId: 'your_default_client_id',
        totalFollowers: 0,
        newFollowers: 0,
        engagementRate: 0,
        dailyAverageNewFollowers: 0,
        qrCodeEngagement: 0,
        totalPosts: 0,
        averageLikes: 0,
        followersChartData: {},
        engagementRateChartData: {},
        adImpressionsChartData: {},
        ctrChartData: {},
        platformInsightsChartData: {},
      },
    });

    return {
      reach,
      impressions,
      profileViews,
      recentMedia: media,
      totalFollowers: followers,
    };
  } catch (error) {
    console.error('Error fetching Instagram data:', error);
    throw error;
  }
}

async function fetchInstagramInsights(metric: string): Promise<number> {
  try {
    const response = await api.get(`/${INSTAGRAM_BUSINESS_ACCOUNT_ID}/insights`, {
      params: {
        metric,
        access_token: process.env.INSTAGRAM_ACCESS_TOKEN,
      },
    });
    return response.data.data[0].values[0].value;
  } catch (error) {
    console.error(`Error fetching Instagram ${metric} insights:`, error);
    throw error;
  }
}

async function fetchInstagramMedia(limit: number): Promise<any[]> {
  try {
    const response = await api.get(`/${INSTAGRAM_BUSINESS_ACCOUNT_ID}/media`, {
      params: {
        fields: 'id,caption,media_url,permalink',
        limit,
        access_token: process.env.INSTAGRAM_ACCESS_TOKEN,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching Instagram media:', error);
    throw error;
  }
}

