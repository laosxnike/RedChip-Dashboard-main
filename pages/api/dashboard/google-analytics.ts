// pages/api/dashboard/google-analytics.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // Calculate date ranges
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

    // Format dates for query
    const formatDate = (date: Date) => date.toISOString().split('T')[0];

    // Fetch current week's data
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
      }
    });

    // Fetch previous week's data for comparison
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

    // Calculate trends
    const calculateTrend = (current: number, previous: number) => {
      if (!previous) return { value: '0%', trend: 'up' as const };
      const percentChange = ((current - previous) / previous) * 100;
      return {
        value: `${Math.abs(percentChange).toFixed(1)}%`,
        trend: percentChange >= 0 ? 'up' as const : 'down' as const
      };
    };

    const currentEngagementRate = currentWeekData?.engagementRate || 0;
    const currentNewUsers = currentWeekData?.newUsers || 0;
    const currentPageviews = currentWeekData?.pageviews || 0;

    const previousEngagementRate = previousWeekData?.engagementRate || 0;
    const previousNewUsers = previousWeekData?.newUsers || 0;
    const previousPageviews = previousWeekData?.pageviews || 0;

    res.status(200).json({
      engagementRate: currentEngagementRate,
      newUsers: currentNewUsers,
      pageviews: currentPageviews,
      trends: {
        engagementRate: calculateTrend(currentEngagementRate, previousEngagementRate),
        newUsers: calculateTrend(currentNewUsers, previousNewUsers),
        pageviews: calculateTrend(currentPageviews, previousPageviews)
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
