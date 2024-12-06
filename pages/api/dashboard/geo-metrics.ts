import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

interface GoogleAnalyticsData {
  locations?: Array<{ latitude: number; longitude: number; count: number; }>;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const geoData = await prisma.dashboard.findMany({
      select: {
        googleAnalyticsData: true
      }
    });

    const locations = geoData.flatMap(data => 
      (data.googleAnalyticsData as GoogleAnalyticsData)?.locations || []
    );

    res.status(200).json({ locations });
  } catch (error) {
    console.error('Error fetching geographic data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
} 