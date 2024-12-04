// pages/api/clients/[clientId].ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

interface ClientWithRelations {
  id: string;
  name: string;
  emailPerformances: any[];
  landingPageTraffics: any[];
  stats: any[];
}

interface ClientDataResponse {
  totalFollowers: number;
  engagementRate: number;
  totalPosts: number;
  averageLikes: number;
  recentPosts: any[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ClientDataResponse | { message: string }>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { clientId } = req.query;

  if (typeof clientId !== 'string') {
    return res.status(400).json({ message: 'Invalid client ID' });
  }

  try {
    const client: ClientWithRelations | null = await prisma.client.findUnique({
      where: { id: clientId },
      include: {
        emailPerformances: {
          orderBy: { date: 'desc' },
          take: 5,
        },
        landingPageTraffics: {
          orderBy: { date: 'desc' },
          take: 1,
        },
        stats: true,
      },
    });

    if (!client) {
      return res.status(404).json({ message: `Client ${clientId} not found` });
    }

    const clientData: ClientDataResponse = {
      totalFollowers: client.landingPageTraffics[0]?.uniqueVisitors || 0,
      engagementRate: client.emailPerformances[0]?.conversionRate || 0,
      totalPosts: client.stats.length,
      averageLikes: client.emailPerformances[0]?.opens || 0,
      recentPosts: client.emailPerformances.map((email) => ({
        date: email.date.toISOString().split('T')[0],
        content: `Email Campaign`,
        likes: email.opens,
        comments: email.clicks,
        shares: Math.floor(email.clicks * email.conversionRate),
      })),
    };

    res.status(200).json(clientData);
  } catch (error) {
    console.error('Error fetching client data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
