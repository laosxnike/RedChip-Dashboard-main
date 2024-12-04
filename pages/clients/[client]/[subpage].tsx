// pages/clients/[client]/[subpage].tsx

import { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import ClientLayout from '../../../components/ClientLayout';
import Overview from '../../../components/client/Overview';
import { ClientDashboardData, ClientDataDetails } from '../../../types/clientDashboard';

interface SubpageProps {
  client: string;
  subpage: string;
  dashboardData: ClientDashboardData | null;
  clientDataDetails: ClientDataDetails | null;
}

const Subpage: NextPage<SubpageProps> = ({ client, subpage, dashboardData, clientDataDetails }) => {
  // Function to capitalize the first letter of the subpage
  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  // Render different components based on the subpage
  const renderSubpage = () => {
    switch (subpage) {
      case 'overview':
        return dashboardData && clientDataDetails ? (
          <Overview 
            dashboardData={dashboardData} 
            clientDataDetails={clientDataDetails} 
            client={client} 
          />
        ) : null;
      // Handle other subpages similarly
      // case 'short-positions':
      //   return <ShortPositions />;
      // ...
      default:
        return null;
    }
  };

  return (
    <ClientLayout client={client}>
      {renderSubpage()}
    </ClientLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const clients = [
    'ZOM', 'PEV', 'LOBO', 'SMXT', 'SPI', 'SPEC', 'ASPI', 'AREC',
    'INHD', 'QYOUF', 'PODC', 'LVO', 'STSS', 'MMA', 'OMQS',
    'EBZT', 'MOB', 'RCAT', 'CVM', 'CBDW', 'AENT', 'TRIB',
    'WHEN', 'KDLY', 'NXL', 'CANF', 'LYT', 'SAVU', 'OSTX',
  ];

  const subpages = [
    'overview',
    // Add other subpages here
    // 'short-positions',
    // 'ownership',
    // 'research-coverage',
    // 'landing-page-traffic',
    // 'webinar-performance',
    // 'email-performance',
    // 'stats',
    // 'feedback',
  ];

  const paths = clients.flatMap((client) =>
    subpages.map((subpage) => ({
      params: { client, subpage },
    }))
  );

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const client = params?.client as string;
  const subpage = params?.subpage as string;

  // Simulate fetching data
  await delay(1000); // Simulate network delay

  // Example fetched data
  const dashboardData: ClientDashboardData = {
    totalFollowers: 1500,
    engagementRate: 4.5,
    totalPosts: 120,
    averageLikes: 300,
  };

  const clientDataDetails: ClientDataDetails = {
    emailPerformance: [
      {
        date: '2023-10-02',
        sends: 1000,
        opens: 200,
        clicks: 50,
        conversionRate: 5.0,
      },
      // Add more entries as needed
    ],
    shortPositions: [
      {
        date: '2024-11-20',
        shortVolume: 10000,
        shortExemptVolume: 1000,
        totalVolume: 11000,
      },
      // Add more entries as needed
    ],
    ownership: [
      {
        institution: 'Institution A',
        shares: 5000,
        change: '-2%',
      },
      // Add more entries as needed
    ],
    researchCoverage: [
      {
        date: '2024-03-15',
        firm: 'Firm X',
        rating: 'Buy',
        priceTarget: 250,
      },
      // Add more entries as needed
    ],
    landingPageTraffic: [
      {
        date: '2023-10-01',
        pageViews: 1000,
        uniqueVisitors: 800,
        conversionRate: 5.0,
      },
      // Add more entries as needed
    ],
    webinarPerformance: [
      {
        date: '2023-09-30',
        registrations: 100,
        attendance: 80,
        conversionRate: 10.0,
      },
      // Add more entries as needed
    ],
    stats: {
      totalViews: 5000,
      totalLeads: 300,
      leadsToday: 20,
    },
    feedback: [ // Ensure this array matches the Feedback interface
      {
        createdAt: '2023-09-25',
        comment: 'Great service!',
        rating: '5',
      },
      // Add more feedback entries as needed
    ],
  };

  return {
    props: {
      client,
      subpage,
      dashboardData,
      clientDataDetails,
    },
    revalidate: 60, // Revalidate every minute
  };
};

// Utility function to simulate delay
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default Subpage;
