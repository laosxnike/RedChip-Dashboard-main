import * as dotenv from 'dotenv';
import { fetchFacebookData } from './services/facebook';
import { fetchTwitterFollowers, fetchTwitterTweets } from './services/twitter';
import { fetchInstagramData } from './services/instagram';
import { getGoogleAnalyticsData } from './services/googleAnalytics';

dotenv.config();

async function testConnections() {
  console.log('Starting API tests...');

  try {
    console.log('\nTesting Facebook API...');
    const facebookData = await fetchFacebookData();
    console.log('Facebook API connection successful:', facebookData);
  } catch (error) {
    console.error('Facebook API connection failed:', error);
  }

  try {
    console.log('\nTesting Twitter API...');
    const followers = await fetchTwitterFollowers('25292321');
    console.log('Twitter followers:', followers);
    const tweets = await fetchTwitterTweets('25292321');
    console.log('Recent tweets:', tweets.length);
  } catch (error) {
    console.error('Twitter API connection failed:', error);
  }

  try {
    console.log('\nTesting Google Analytics API...');
    const startDate = '7daysAgo';
    const endDate = 'today';
    const gaData = await getGoogleAnalyticsData(startDate, endDate);
    console.log('Google Analytics API connection successful');
    console.log('Data received:', JSON.stringify(gaData, null, 2));
  } catch (error) {
    console.error('Google Analytics API connection failed:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
  }

  console.log('\nSkipping Instagram API test (access token not available)');
  console.log('Skipping LinkedIn API test (access token not available)');
  console.log('Skipping Webull API test');

  console.log('\nAPI tests completed.');
}

testConnections();
