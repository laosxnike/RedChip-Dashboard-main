import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

// Load environment variables
const ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN;
const PAGE_ID = process.env.FACEBOOK_PAGE_ID;

console.log('Facebook ACCESS_TOKEN:', ACCESS_TOKEN ? 'Set' : 'Not set');
console.log('Facebook PAGE_ID:', PAGE_ID ? 'Set' : 'Not set');

if (!ACCESS_TOKEN || !PAGE_ID) {
  throw new Error('Missing required environment variables for Facebook API');
}

const api = axios.create({
  baseURL: 'https://graph.facebook.com/v18.0',
  params: {
    access_token: ACCESS_TOKEN,
  },
});

export async function fetchFacebookPageInsights(metric: string, period: string = 'day') {
  try {
    const response = await api.get(`/${PAGE_ID}/insights`, {
      params: {
        metric,
        period,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching Facebook insights for ${metric}:`, error);
    throw error;
  }
}

export async function fetchFacebookPosts(limit: number = 10) {
  try {
    const response = await api.get(`/${PAGE_ID}/posts`, {
      params: {
        fields: 'id,message,created_time,likes.summary(true),comments.summary(true),shares',
        limit,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching Facebook posts:', error);
    throw error;
  }
}

export async function fetchFacebookPageFans() {
  try {
    const response = await api.get(`/${PAGE_ID}`, {
      params: {
        fields: 'fan_count',
      },
    });
    return response.data.fan_count;
  } catch (error) {
    console.error('Error fetching Facebook page fans:', error);
    throw error;
  }
}

export async function fetchFacebookData() {
  try {
    const [pageViews, engagement, posts, fans] = await Promise.all([
      fetchFacebookPageInsights('page_views_total'),
      fetchFacebookPageInsights('page_post_engagements'),
      fetchFacebookPosts(5),
      fetchFacebookPageFans(),
    ]);

    return {
      pageViews,
      engagement,
      recentPosts: posts,
      totalFans: fans,
    };
  } catch (error) {
    console.error('Error fetching Facebook data:', error);
    throw error;
  }
}
