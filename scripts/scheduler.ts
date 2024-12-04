// scripts/scheduler.ts

import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import cron from 'node-cron';
import { fetchGoogleAnalyticsData } from '../src/services/googleAnalytics.js';

// Load environment variables from .env file
dotenv.config();

const prisma = new PrismaClient();

/**
 * Function to perform the scheduled task:
 * Fetch Google Analytics data and upsert it into the Dashboard table.
 */
async function performScheduledTask() {
  try {
    console.log('📅 Scheduled Task Started: Fetching Google Analytics Data');

    // Define your date range for fetching data
    // For hourly updates, fetch data for the last hour
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - 60 * 60 * 1000); // 1 hour ago

    // Format dates as 'YYYY-MM-DD'
    const formatDate = (date: Date) => date.toISOString().split('T')[0];
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    console.log(`Fetching Google Analytics data from ${formattedStartDate} to ${formattedEndDate}`);

    // Fetch data from Google Analytics
    const { sessions, users, pageviews, analyticsData } = await fetchGoogleAnalyticsData(
      formattedStartDate,
      formattedEndDate
    );

    // Upsert the fetched data into the Dashboard table
    await prisma.dashboard.upsert({
      where: {
        id: 'default_dashboard_id', // Ensure this ID exists or is handled appropriately
      },
      update: {
        sessions,
        users,
        pageviews,
        googleAnalyticsData: analyticsData,
        // No need to manually set updatedAt; Prisma handles it
      },
      create: {
        id: 'default_dashboard_id',
        sessions,
        users,
        pageviews,
        googleAnalyticsData: analyticsData,
        clientId: 'your_default_client_id', // Must correspond to an existing Client record
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
        // No need to manually set updatedAt; Prisma handles it
      },
    });

    console.log('✅ Scheduled Task Completed: Data Upserted Successfully');
  } catch (error) {
    console.error('❌ Scheduled Task Failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * Initialize the scheduler.
 * Runs `performScheduledTask` every hour at the 0th minute.
 */
function initializeScheduler() {
  // Schedule the task to run at minute 0 of every hour
  cron.schedule('0 * * * *', () => {
    performScheduledTask();
  });

  console.log('🕒 Scheduler Initialized: Task will run every hour at minute 0');
}

// Start the scheduler
initializeScheduler();

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});