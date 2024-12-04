import axios from 'axios';
import OAuth from 'oauth-1.0a';
import crypto from 'crypto';

// Load environment variables
const BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;
const USER_ID = process.env.TWITTER_USER_ID;
const API_KEY = process.env.TWITTER_API_KEY;
const API_SECRET = process.env.TWITTER_API_SECRET;
const ACCESS_TOKEN = process.env.TWITTER_ACCESS_TOKEN;
const ACCESS_TOKEN_SECRET = process.env.TWITTER_ACCESS_TOKEN_SECRET;

if (!BEARER_TOKEN || !USER_ID || !API_KEY || !API_SECRET || !ACCESS_TOKEN || !ACCESS_TOKEN_SECRET) {
  throw new Error('Missing required environment variables for Twitter API');
}

const oauth = new OAuth({
  consumer: { key: API_KEY, secret: API_SECRET },
  signature_method: 'HMAC-SHA1',
  hash_function(base_string, key) {
    return crypto.createHmac('sha1', key).update(base_string).digest('base64');
  }
});

const token = { key: ACCESS_TOKEN, secret: ACCESS_TOKEN_SECRET };

const api = axios.create({
  baseURL: 'https://api.twitter.com/2',
  headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
});

export async function fetchTwitterFollowers(userId: string) {
  const url = `https://api.twitter.com/1.1/users/show.json?user_id=${userId}`;
  const authHeader = oauth.toHeader(oauth.authorize({ url, method: 'GET' }, token));

  try {
    const response = await axios.get(url, {
      headers: { Authorization: authHeader["Authorization"] }
    });
    return response.data.followers_count;
  } catch (error) {
    console.error('Error fetching Twitter followers:', error);
    throw error;
  }
}

export async function fetchTwitterTweets(userId: string) {
  const url = `https://api.twitter.com/1.1/statuses/user_timeline.json?user_id=${userId}&count=10`;
  const authHeader = oauth.toHeader(oauth.authorize({ url, method: 'GET' }, token));

  try {
    const response = await axios.get(url, {
      headers: { Authorization: authHeader["Authorization"] }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Twitter tweets:', error);
    throw error;
  }
}

export async function fetchTwitterMentions(limit: number = 10) {
  try {
    const response = await api.get(`/users/${USER_ID}/mentions`, {
      params: {
        max_results: limit,
        'tweet.fields': 'created_at,public_metrics',
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching Twitter mentions:', error);
    throw error;
  }
}

export async function fetchTwitterMetrics(startTime: string, endTime: string) {
  try {
    const response = await api.get(`/users/${USER_ID}/tweets`, {
      params: {
        'tweet.fields': 'public_metrics',
        start_time: startTime,
        end_time: endTime,
        exclude: 'retweets,replies',
      },
    });
    const tweets = response.data.data;
    return tweets.reduce((acc: any, tweet: any) => {
      acc.impressions += tweet.public_metrics.impression_count;
      acc.likes += tweet.public_metrics.like_count;
      acc.retweets += tweet.public_metrics.retweet_count;
      return acc;
    }, { impressions: 0, likes: 0, retweets: 0 });
  } catch (error) {
    console.error('Error fetching Twitter metrics:', error);
    throw error;
  }
}

export async function fetchTwitterData() {
  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  
  try {
    const [followers, recentTweets, recentMentions, weekMetrics] = await Promise.all([
      fetchTwitterFollowers(USER_ID!),
      fetchTwitterTweets(USER_ID!),
      fetchTwitterMentions(5),
      fetchTwitterMetrics(oneWeekAgo.toISOString(), now.toISOString()),
    ]);

    return {
      followers,
      recentTweets,
      recentMentions,
      weekMetrics,
    };
  } catch (error) {
    console.error('Error fetching Twitter data:', error);
    throw error;
  }
}
