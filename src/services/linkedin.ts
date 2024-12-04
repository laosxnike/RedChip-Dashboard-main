import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

// Load environment variables
const ACCESS_TOKEN = process.env.LINKEDIN_ACCESS_TOKEN;
const ORGANIZATION_ID = process.env.LINKEDIN_ORGANIZATION_ID;

console.log('LinkedIn ACCESS_TOKEN:', ACCESS_TOKEN ? 'Set' : 'Not set');
console.log('LinkedIn ORGANIZATION_ID:', ORGANIZATION_ID ? 'Set' : 'Not set');

if (!ACCESS_TOKEN) {
  throw new Error('Missing required ACCESS_TOKEN for LinkedIn API');
}

// Warn if ORGANIZATION_ID is missing, but don't throw an error
if (!ORGANIZATION_ID) {
  console.warn('LINKEDIN_ORGANIZATION_ID is not set. Some LinkedIn API functions may not work.');
}

const api = axios.create({
  baseURL: 'https://api.linkedin.com/v2',
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    'X-Restli-Protocol-Version': '2.0.0',
  },
});

export async function fetchLinkedInFollowers(): Promise<number> {
  try {
    const response = await api.get(`/organizations/${ORGANIZATION_ID}/followingStatistics`);
    return response.data.totalFollowerCount;
  } catch (error) {
    console.error('Error fetching LinkedIn followers:', error);
    throw error;
  }
}

export async function fetchLinkedInEngagement(startDate: string, endDate: string): Promise<any> {
  try {
    const response = await api.get(`/organizationalEntityShareStatistics`, {
      params: {
        q: `organizationalEntity:(id:${ORGANIZATION_ID})`,
        startDate,
        endDate,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching LinkedIn engagement:', error);
    throw error;
  }
}

export async function fetchLinkedInPosts(limit: number = 10): Promise<any[]> {
  try {
    const response = await api.get(`/shares`, {
      params: {
        q: `owners`,
        owners: `urn:li:organization:${ORGANIZATION_ID}`,
        count: limit,
      },
    });
    return response.data.elements;
  } catch (error) {
    console.error('Error fetching LinkedIn posts:', error);
    throw error;
  }
}

export async function fetchLinkedInVisitors(timeRange: string): Promise<number> {
  try {
    const response = await api.get(`/organizationPageStatistics`, {
      params: {
        q: `organization`,
        organization: `urn:li:organization:${ORGANIZATION_ID}`,
        timeIntervals: `(timeRange:(start:${timeRange}))`,
      },
    });
    return response.data.elements[0].totalPageStatistics.views.allPageViews.pageViews;
  } catch (error) {
    console.error('Error fetching LinkedIn page visitors:', error);
    throw error;
  }
}

export async function fetchLinkedInData(): Promise<any> {
  try {
    let data: any = {};

    if (ORGANIZATION_ID) {
      const [followers, engagement] = await Promise.all([
        fetchLinkedInFollowers(),
        fetchLinkedInEngagement('2023-01-01', '2023-12-31'), // Adjust date range as needed
      ]);
      data = { followers, engagement };
    } else {
      console.log('Skipping organization-specific LinkedIn data due to missing ORGANIZATION_ID');
    }

    // Add any non-organization specific API calls here

    return data;
  } catch (error) {
    console.error('Error fetching LinkedIn data:', error);
    throw error;
  }
}
