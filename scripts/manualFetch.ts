   // scripts/manualFetch.ts
   import dotenv from 'dotenv';
   import { fetchAndStoreGoogleAnalyticsData } from '../src/services/googleAnalytics.js';
   
   dotenv.config();
   
   async function manualFetch() {
     try {
       const startDate = '2023-01-01'; // Adjust as needed
       const endDate = '2023-12-31';   // Adjust as needed
       
       await fetchAndStoreGoogleAnalyticsData(startDate, endDate);
       console.log('✅ Manual fetch and store completed successfully.');
     } catch (error) {
       console.error('❌ Manual fetch failed:', error);
     }
   }
   
   manualFetch();