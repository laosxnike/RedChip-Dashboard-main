import cron from 'node-cron';
import { fetchAndStoreGoogleAnalyticsData } from '../services/googleAnalytics';
import { fetchInstagramData } from '../services/instagram';
import { prisma } from '../lib/prisma';

const dataFetcher = () => {
  // Schedule tasks to run every hour
  cron.schedule('0 * * * *', async () => {
    console.log(' Running scheduled data fetch tasks every hour...');

    try {
      // Define your date range for fetching data
      const endDate = new Date();
      const startDate = new Date(endDate.getTime() - 60 * 60 * 1000); // 1 hour ago

      // Format dates as 'YYYY-MM-DD'
      const formatDate = (date: Date) => date.toISOString().split('T')[0];
      const formattedStartDate = formatDate(startDate);
      const formattedEndDate = formatDate(endDate);

      console.log(`Fetching Google Analytics data from ${formattedStartDate} to ${formattedEndDate}`);

      // Fetch and store Google Analytics data
      await fetchAndStoreGoogleAnalyticsData(formattedStartDate, formattedEndDate);

      console.log('✅ Google Analytics data upserted into the database.');
    } catch (error) {
      console.error('❌ Error updating Google Analytics data:', error);
    }

    try {
      // Fetch and update Instagram data (optional)
      const instagramData = await fetchInstagramData();
      console.log('✅ Instagram data updated.');
      // Implement similar upsert logic for Instagram data if needed
    } catch (error) {
      console.error('❌ Error updating Instagram data:', error);
    }

    // Add more services as needed
  });
};

export default dataFetcher;