// pages/audience-insights.tsx

import { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import { prisma } from '../lib/prisma';
import { DashboardData, Metric, ChartDataStructure, EngagingPost, Client } from '../types/dashboard';
import StatCard from '../components/StatCard';
import DemographicsCard from '../components/DemographicsCard';
import AgeGroupCard from '../components/AgeGroupCard';
import ImageGrid from '../components/ImageGrid';
import AudienceGrowthChart from '../components/AudienceGrowthChart';
import BounceRateChart from '../components/BounceRateChart';

interface AudienceInsightsProps {
  dashboardData: DashboardData | null;
}

const AudienceInsights: NextPage<AudienceInsightsProps> = ({ dashboardData }) => {
  if (!dashboardData) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        <p>No audience insights data available.</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Audience Insights</title>
        <meta name="description" content="RedChip's Audience Insights Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative flex min-h-screen flex-col bg-[#111518] dark overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
        {/* Main Container */}
        <div className="layout-container flex h-full grow flex-col">
          {/* Page Header and Navigation are omitted as per your request */}

          {/* Main Content */}
          <main className="px-40 flex flex-1 justify-center py-5">
            {/* Example: Stat Cards */}
            <div className="flex flex-wrap gap-4">
              <StatCard title="Total Views" value={dashboardData.totalFollowers.toString()} />
              <StatCard title="Total Leads" value={dashboardData.totalFollowers.toString()} />
              {/* Add more StatCards as needed */}
            </div>

            {/* Example: Demographics */}
            <DemographicsCard />

            {/* Example: Age Group */}
            <AgeGroupCard />

            {/* Example: Image Grid */}
            <ImageGrid />

            {/* Example: Audience Growth Chart */}
            <AudienceGrowthChart />

            {/* Example: Bounce Rate Chart */}
            <BounceRateChart />

            {/* Add more components as needed */}
          </main>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const [dashboard, platformMetrics, engagingPosts, clients, chartEntries] = await Promise.all([
      prisma.dashboard.findFirst({
        orderBy: { id: 'desc' },
      }),
      prisma.platformMetric.findMany(),
      prisma.engagingPost.findMany({ take: 10 }),
      prisma.client.findMany({ take: 51, select: { symbol: true } }),
      prisma.chart.findMany(),
    ]);

    if (!dashboard) {
      return {
        props: {
          dashboardData: null,
        },
      };
    }

    // Process platform data
    const platformData: { [key: string]: Metric[] } = {};
    platformMetrics.forEach((platformMetric) => {
      const { name, metrics } = platformMetric;

      const parsedMetrics: Metric[] = Array.isArray(metrics)
        ? (metrics as any[]).map((m) => ({
            platform: name,
            label: m.label,
            value: m.value,
          }))
        : [];

      platformData[name] = parsedMetrics;
    });

    // Process charts data
    const charts: { [key: string]: ChartDataStructure } = {};
    chartEntries.forEach((chart) => {
      const { type, labels, datasetLabel, data, borderColor, backgroundColor } = chart;

      if (!charts[type]) {
        charts[type] = {
          labels: labels.split(','),
          datasets: [],
        };
      }

      charts[type].datasets.push({
        label: datasetLabel,
        data: data.split(',').map(Number),
        borderColor,
        backgroundColor,
      });
    });

    const dashboardData: DashboardData = {
      id: dashboard.id,
      bounceRate: dashboard.bounceRate,
      CPA: dashboard.CPA,
      conversionRate: dashboard.conversionRate,
      CTR: dashboard.CTR,
      sessionDuration: dashboard.sessionDuration,
      totalFollowers: dashboard.totalFollowers,
      newFollowers: dashboard.newFollowers,
      engagementRate: dashboard.engagementRate,
      newUsers: dashboard.newUsers,
      createdAt: dashboard.createdAt,
      updatedAt: dashboard.updatedAt,
      date: dashboard.date,
      platformData,
      engagingPosts: engagingPosts.map((post) => ({
        imageUrl: post.imageUrl,
        title: post.title,
      })),
      clients: clients.map((client) => ({
        symbol: client.symbol,
      })),
      charts,
      // Add other necessary properties here
    };

    return {
      props: {
        dashboardData,
      },
    };
  } catch (error) {
    console.error('Error fetching audience insights data:', error);
    return {
      props: {
        dashboardData: null,
      },
    };
  }
};

export default AudienceInsights;
