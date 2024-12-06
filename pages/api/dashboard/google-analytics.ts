// pages/api/dashboard/google-analytics.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

interface GoogleAnalyticsData {
  trafficSources: {
    organic: number;
    paid: number;
    social: number;
    direct: number;
    referral: number;
  };
  topPages: Array<{
    path: string;
    views: number;
  }>;
  sessionDuration: {
    labels: string[];
    data: number[];
  };
  ads: {
    labels: string[];
    data: number[];
  };
  geoDistribution: {
    labels: string[];
    data: number[];
  };
  visitors: {
    labels: string[];
    returning: number[];
    new: number[];
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

    const currentWeekData = await prisma.dashboard.findFirst({
      where: {
        id: 'default_dashboard_id',
        updatedAt: {
          gte: oneWeekAgo,
          lte: now
        }
      },
      orderBy: {
        updatedAt: 'desc'
      },
      select: {
        engagementRate: true,
        newUsers: true,
        pageviews: true,
        googleAnalyticsData: true,
        sessions: true
      }
    });

    const previousWeekData = await prisma.dashboard.findFirst({
      where: {
        id: 'default_dashboard_id',
        updatedAt: {
          gte: twoWeeksAgo,
          lt: oneWeekAgo
        }
      },
      orderBy: {
        updatedAt: 'desc'
      }
    });

    const calculateTrend = (current: number, previous: number) => {
      if (!previous) return { value: '0%', trend: 'up' as const };
      const percentChange = ((current - previous) / previous) * 100;
      return {
        value: `${Math.abs(percentChange).toFixed(1)}%`,
        trend: percentChange >= 0 ? 'up' as const : 'down' as const
      };
    };

    const analyticsData = (currentWeekData?.googleAnalyticsData as unknown as GoogleAnalyticsData) || {};
    
    res.status(200).json({
      engagementRate: currentWeekData?.engagementRate || 0,
      newUsers: currentWeekData?.newUsers || 0,
      pageviews: currentWeekData?.pageviews || 0,
      trends: {
        engagementRate: calculateTrend(currentWeekData?.engagementRate || 0, previousWeekData?.engagementRate || 0),
        newUsers: calculateTrend(currentWeekData?.newUsers || 0, previousWeekData?.newUsers || 0),
        pageviews: calculateTrend(currentWeekData?.pageviews || 0, previousWeekData?.pageviews || 0)
      },
      trafficSources: analyticsData.trafficSources || {
        organic: 0,
        paid: 0,
        social: 0,
        direct: 0,
        referral: 0
      },
      topPages: analyticsData.topPages || [],
      sessionDuration: {
        labels: analyticsData.sessionDuration?.labels || [],
        data: analyticsData.sessionDuration?.data || []
      },
      ads: {
        labels: analyticsData.ads?.labels || [],
        data: analyticsData.ads?.data || []
      },
      geoDistribution: {
        labels: analyticsData.geoDistribution?.labels || [],
        data: analyticsData.geoDistribution?.data || []
      },
      visitors: {
        labels: analyticsData.visitors?.labels || [],
        returning: analyticsData.visitors?.returning || [],
        new: analyticsData.visitors?.new || []
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
