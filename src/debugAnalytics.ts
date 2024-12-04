import { BetaAnalyticsDataClient } from '@google-analytics/data';
import dotenv from 'dotenv';

dotenv.config();

let analyticsDataClient: BetaAnalyticsDataClient | null = null;

console.log('GOOGLE_CLIENT_EMAIL:', process.env.GOOGLE_CLIENT_EMAIL);
console.log('GOOGLE_PRIVATE_KEY is set:', !!process.env.GOOGLE_PRIVATE_KEY);
console.log('GA_PROPERTY_ID:', process.env.GA_PROPERTY_ID);

try {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!clientEmail || !privateKey) {
    throw new Error('Google Analytics credentials are not fully set in environment variables');
  }

  const credentials = {
    client_email: clientEmail,
    private_key: privateKey.replace(/\\n/g, '\n'),
  };

  console.log('Google Analytics credentials loaded successfully');

  analyticsDataClient = new BetaAnalyticsDataClient({
    credentials: credentials,
  });
  console.log('Google Analytics client initialized successfully');
} catch (error) {
  console.error('Error initializing Google Analytics client:', error);
}

export const getGoogleAnalyticsData = async (startDate: string, endDate: string) => {
  if (!analyticsDataClient) {
    throw new Error('Google Analytics client is not initialized');
  }

  const propertyId = process.env.GA_PROPERTY_ID;
  if (!propertyId) {
    throw new Error('GA_PROPERTY_ID is not set in environment variables');
  }

  try {
    console.log(`Fetching Google Analytics data for property ID ${propertyId} from ${startDate} to ${endDate}`);
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate, endDate }],
      metrics: [
        { name: 'activeUsers' },
        { name: 'sessions' },
        { name: 'bounceRate' },
        { name: 'averageSessionDuration' }
      ],
    });
    console.log('Google Analytics data fetched successfully:', JSON.stringify(response, null, 2));
    return response;
  } catch (error) {
    console.error('Error fetching Google Analytics data:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    throw error;
  }
};
