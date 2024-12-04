// pages/clients/[client]/index.tsx

import { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import ClientLayout from '../../../components/ClientLayout';
import Overview from '../../../components/client/Overview';
import Head from 'next/head';
import { 
  ClientDashboardData, 
  ClientDataDetails, 
  SerializedEmailPerformance, 
  SerializedLandingPageTraffic 
} from '../../../types/clientDashboard';
import { PrismaClient } from '@prisma/client';
import { clients } from '../../../lib/clients';

interface ClientData {
  dashboardData: ClientDashboardData;
  clientDataDetails: ClientDataDetails;
}

interface ClientPageProps {
  client: string;
  data: ClientData | null;
  isLoading: boolean;
  error: string | null;
}

const ClientPage: NextPage<ClientPageProps> = ({ client, data, isLoading, error }) => {
  const pageTitle = `${client} Dashboard | Galileo Design`;
  
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <ClientLayout client={client}>
        <div className="flex flex-wrap justify-between gap-3 mb-8">
          <p className="text-white text-3xl font-black leading-tight tracking-[-0.033em] min-w-72">
            {client}
          </p>
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <p className="text-white">Loading...</p>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-screen">
            <p className="text-white">Error: {error}</p>
          </div>
        ) : data ? (
          <Overview 
            dashboardData={data.dashboardData} 
            clientDataDetails={data.clientDataDetails}
            client={client}
          />
        ) : (
          <div className="flex justify-center items-center h-screen">
            <p className="text-white">No data available for this client.</p>
          </div>
        )}
      </ClientLayout>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = clients.map(client => ({
    params: { client },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const client = params?.client as string;
  const prisma = new PrismaClient();

  try {
    const clientData = await prisma.client.findUnique({
      where: { name: client },
      include: {
        emailPerformances: true,
        landingPageTraffics: true,
        stats: true,
        // Include other relations as needed
      },
    });

    if (!clientData) {
      return {
        props: {
          client,
          data: null,
          isLoading: false,
          error: "Client not found",
        },
      };
    }

    // Serialize EmailPerformances
    const serializedEmailPerformances: SerializedEmailPerformance[] = clientData.emailPerformances.map((ep) => ({
      id: ep.id,
      clientId: ep.clientId,
      date: ep.date.toISOString(),
      conversionRate: ep.conversionRate,
      sends: ep.sends,
      opens: ep.opens,
      clicks: ep.clicks,
    }));

    // Serialize LandingPageTraffics
    const serializedLandingPageTraffics: SerializedLandingPageTraffic[] = clientData.landingPageTraffics.map((traffic) => ({
      id: traffic.id,
      clientId: traffic.clientId,
      date: traffic.date.toISOString(),
      pageViews: traffic.pageViews,
      uniqueVisitors: traffic.uniqueVisitors,
      conversionRate: traffic.conversionRate,
    }));

    return {
      props: {
        client,
        data: {
          dashboardData: {
            totalFollowers: clientData.landingPageTraffics[0]?.uniqueVisitors || 0,
            engagementRate: clientData.emailPerformances[0]?.conversionRate || 0,
            totalPosts: clientData.stats.length,
            averageLikes: clientData.emailPerformances[0]?.opens || 0,
          },
          clientDataDetails: {
            emailPerformances: serializedEmailPerformances,
            landingPageTraffics: serializedLandingPageTraffics,
            stats: {
              totalViews: clientData.stats[0]?.totalViews || 0,
              totalLeads: clientData.stats[0]?.totalLeads || 0,
              leadsToday: clientData.stats[0]?.leadsToday || 0,
            },
            shortPositionRecords: [], // Populate as needed
            ownerships: [], // Populate as needed
            researchCoverages: [], // Populate as needed
            webinarPerformances: [], // Populate as needed
            feedbacks: [], // Populate as needed
          },
        },
        isLoading: false,
        error: null,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error fetching client data:', error);
    return {
      props: {
        client,
        data: null,
        isLoading: false,
        error: "Failed to fetch client data",
      },
    };
  } finally {
    await prisma.$disconnect();
  }
};

export default ClientPage;
