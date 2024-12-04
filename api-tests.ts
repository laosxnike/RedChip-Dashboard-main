import axios, { AxiosError } from 'axios';
import dotenv from 'dotenv';

dotenv.config();

async function testFacebookAPI() {
  try {
    const response = await axios.get(`https://graph.facebook.com/v21.0/me?fields=id,name&access_token=${process.env.FACEBOOK_ACCESS_TOKEN}`);
    console.log('Facebook API Test:', response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Facebook API Error:', error.response?.data || error.message);
    } else {
      console.error('Facebook API Error:', error);
    }
  }
}

async function testTwitterAPI() {
  try {
    const response = await axios.get('https://api.twitter.com/2/users/me', {
      headers: {
        'Authorization': `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
      }
    });
    console.log('Twitter API Test:', response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Twitter API Error:', error.response?.data || error.message);
    } else {
      console.error('Twitter API Error:', error);
    }
  }
}

async function testGoogleAnalyticsAPI() {
  console.log('Google Analytics API test not implemented. You may need to use the googleapis library for this.');
  // Implementation would depend on the specific Google Analytics API you're using (UA or GA4)
}

async function runTests() {
  console.log('Starting API tests...');
  
  console.log('\nTesting Facebook API:');
  await testFacebookAPI();
  
  console.log('\nTesting Twitter API:');
  await testTwitterAPI();
  
  console.log('\nTesting Google Analytics API:');
  await testGoogleAnalyticsAPI();
  
  console.log('\nSkipping LinkedIn API test (requires approval)');
  console.log('Skipping Instagram API test');
  
  console.log('\nAPI tests completed.');
}

runTests();
