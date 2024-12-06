import { google } from 'googleapis';
import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';
import { createInterface } from 'readline/promises';

dotenv.config();

const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');
const TOKEN_PATH = path.join(process.cwd(), 'youtube_token.json');

async function getNewToken(oauth2Client: any) {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/youtube.readonly',
      'https://www.googleapis.com/auth/yt-analytics.readonly'
    ],
  });

  console.log('Authorize this app by visiting this URL:', authUrl);
  console.log('After authorizing, copy the code from the URL that starts with "http://localhost/?code="');
  
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const fullUrl = await rl.question('Paste the full redirect URL here: ');
  rl.close();
  
  // Extract the code from the URL
  const code = new URL(fullUrl).searchParams.get('code');
  if (!code) {
    throw new Error('No code found in the redirect URL');
  }

  const { tokens } = await oauth2Client.getToken(code);
  return tokens;
}

async function authorize() {
  const content = fs.readFileSync(CREDENTIALS_PATH, 'utf-8');
  const credentials = JSON.parse(content);
  
  const oauth2Client = new google.auth.OAuth2(
    credentials.web.client_id,
    credentials.web.client_secret,
    'http://localhost'  // Using http://localhost as redirect URI
  );

  // Check if we have previously stored a token.
  try {
    if (fs.existsSync(TOKEN_PATH)) {
      const token = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf-8'));
      oauth2Client.setCredentials(token);
      return oauth2Client;
    }
  } catch (err) {
    // Token doesn't exist or is invalid
  }

  // If no valid token, get a new one
  const token = await getNewToken(oauth2Client);
  oauth2Client.setCredentials(token);
  
  // Store the token
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
  return oauth2Client;
}

async function testYouTubeAnalytics() {
  try {
    const auth = await authorize();
    
    // First, test if we can access the YouTube Data API
    const youtube = google.youtube({
      version: 'v3',
      auth,
    });

    console.log('Testing YouTube Data API access...');
    const channelResponse = await youtube.channels.list({
      part: ['snippet,contentDetails,statistics'],
      mine: true
    });

    console.log('Channel info:', JSON.stringify(channelResponse.data, null, 2));

    // Then test YouTube Analytics API
    console.log('\nTesting YouTube Analytics API access...');
    const youtubeAnalytics = google.youtubeAnalytics({
      version: 'v2',
      auth,
    });

    const data = await youtubeAnalytics.reports.query({
      ids: 'channel==MINE',
      startDate: '2024-11-27',
      endDate: '2024-12-04',
      metrics: 'views,estimatedMinutesWatched,averageViewDuration,subscribersGained,likes',
      dimensions: 'day',
    });

    console.log('YouTube Analytics Data:', JSON.stringify(data.data, null, 2));
  } catch (error: any) {
    console.error('YouTube Analytics Test Error:', {
      message: error.message,
      status: error.status,
      code: error.code,
      details: error.response?.data?.error || error.errors,
    });
  }
}

testYouTubeAnalytics();