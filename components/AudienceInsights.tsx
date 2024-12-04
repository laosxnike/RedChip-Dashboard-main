// pages/audience-insights.tsx
import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import StatCard from '../components/StatCard';
import DemographicsCard from '../components/DemographicsCard';
import AgeGroupCard from '../components/AgeGroupCard';
import ImageGrid from '../components/ImageGrid';
import AudienceGrowthChart from '../components/AudienceGrowthChart';
import BounceRateChart from '../components/BounceRateChart';
import useSWR from 'swr';
import axios from 'axios';

// Define the shape of the dashboard data
interface DashboardData {
  engagementRate: number;
  dailyAverageNewFollowers: number;
  qrCodeEngagement: number;
  bounceRate: number;
  CPA: number;
  conversionRate: number;
  CTR: number;
  newUsers: number;
  returningUsers: number;
  sessions: number;
  users: number;
  pageviews: number;
  averageSessionDuration: number;
  followersChartData: ChartDataPoint[];
  engagementRateChartData: ChartDataPoint[];
  adImpressionsChartData: ChartDataPoint[];
  ctrChartData: ChartDataPoint[];
  platformInsightsChartData: ChartDataPoint[];
  platformMetrics: any[]; // Replace with actual type if available
  additionalKPIs: any[]; // Replace with actual type if available
  adPerformance: any[]; // Replace with actual type if available
  engagingPosts: any[]; // Replace with actual type if available
  engagedUsers: any[]; // Replace with actual type if available
  clients: string[];
  googleAnalyticsData?: any;
}

interface ChartDataPoint {
  date: string;
  value: number;
}

// Fetcher function for SWR
const fetcher = (url: string) => axios.get(url).then(res => res.data);

const AudienceInsights: NextPage = () => {
  const { data, error } = useSWR<DashboardData>('/api/dashboard', fetcher);

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        <p>Error loading data.</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Audience Insights</title>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&family=Noto+Sans:wght@400;500;700;900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </Head>
      <div
        className="relative flex min-h-screen flex-col bg-[#111518] dark overflow-x-hidden"
        style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
      >
        {/* Main Container */}
        <div className="layout-container flex h-full grow flex-col">
          {/* Page Header and Navigation are omitted as per your request */}

          {/* Main Content */}
          <main className="px-40 flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
              {/* Header Section */}
              <div className="flex flex-wrap justify-between gap-3 p-4">
                <p className="text-white text-4xl font-black leading-tight tracking-tight min-w-72">
                  Audience Insights
                </p>
                <button className="flex min-w-[84px] max-w-[480px] items-center justify-center rounded-xl h-10 px-4 bg-[#283139] text-white text-sm font-bold">
                  New Report
                </button>
              </div>

              {/* Metrics Section */}
              <section className="flex flex-wrap gap-4 p-4">
                <StatCard title="Bounce Rate" value={data.bounceRate} unit="%" />
                <StatCard title="CPA" value={`$${data.CPA.toFixed(2)}`} />
                <StatCard title="Conversion Rate" value={data.conversionRate} unit="%" />
                <StatCard title="CTR" value={data.CTR} unit="%" />
                <StatCard title="New Users" value={data.newUsers} />
                <StatCard title="Returning Users" value={data.returningUsers} />
                <StatCard title="Sessions" value={data.sessions} />
                <StatCard title="Pageviews" value={data.pageviews} />
                <StatCard title="Avg. Session Duration" value={`${data.averageSessionDuration.toFixed(2)}s`} unit="s" />
              </section>

              {/* Bounce Rate Section */}
              <section className="px-4 pb-2 pt-4">
                <h3 className="text-white text-lg font-bold leading-tight tracking-tight">
                  Bounce Rate Over Time
                </h3>
                <BounceRateChart data={data.followersChartData} />
              </section>

              {/* Audience Demographics Section */}
              <section className="px-4 pb-2 pt-4">
                <h3 className="text-white text-lg font-bold leading-tight tracking-tight">
                  Audience Demographics
                </h3>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
                  <DemographicsCard
                    label="Male"
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24px"
                        height="24px"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                      >
                        <path d="M216,32H168a8,8,0,0,0,0,16h28.69L154.62,90.07a80,80,0,1,0,11.31,11.31L208,59.32V88a8,8,0,0,0,16,0V40A8,8,0,0,0,216,32ZM149.24,197.29a64,64,0,1,1,0-90.53A64.1,64.1,0,0,1,149.24,197.29Z"></path>
                      </svg>
                    }
                  />
                  <DemographicsCard
                    label="Female"
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24px"
                        height="24px"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                      >
                        <path d="M208,96a80,80,0,1,0-88,79.6V200H88a8,8,0,0,0,0,16h32v24a8,8,0,0,0,16,0V216h32a8,8,0,0,0,0-16H136V175.6A80.11,80.11,0,0,0,208,96ZM64,96a64,64,0,1,1,64,64A64.07,64.07,0,0,1,64,96Z"></path>
                      </svg>
                    }
                  />
                </div>
              </section>

              {/* Audience Age Groups Section */}
              <section className="flex flex-wrap gap-4 p-4">
                <AgeGroupCard label="Age 18-24" value="20%" />
                <AgeGroupCard label="Age 25-34" value="30%" />
                <AgeGroupCard label="Age 35-44" value="25%" />
                <AgeGroupCard label="Age 45-54" value="15%" />
              </section>

              {/* Audience Interests Section */}
              <section className="px-4 pb-2 pt-4">
                <h3 className="text-white text-lg font-bold leading-tight tracking-tight">
                  Audience Interests
                </h3>
                <ImageGrid
                  imageIds={[
                    '20a6b6d6-67fd-44fd-8eb9-51b4fbe250de',
                    '29bc99f2-3e9f-450a-968a-c093d56a1dfa',
                    '9c5fedb3-a8b6-4d3f-a7b8-a750435eebed',
                    '383e9ab1-2d12-43d4-bacd-49e0c4064bf6',
                    '2d2ae651-d377-4a4f-8aa1-fb6cf2674a5a',
                  ]}
                  baseUrl="https://cdn.usegalileo.ai/stability"
                />
              </section>

              {/* Audience Locations Section */}
              <section className="px-4 pb-2 pt-4">
                <h3 className="text-white text-lg font-bold leading-tight tracking-tight">
                  Audience Locations
                </h3>
                <ImageGrid
                  imageIds={[
                    'c26b689b-a09f-4c2a-a31f-1363145ec1db',
                    '31fd1606-7006-4ef9-88be-09b66d39ed23',
                    '048daa5f-2356-4ee0-9c7e-5c6d7eef5261',
                    '6001dd8c-f209-443f-8fe0-3489d51c99c2',
                    '4b093d71-c73d-48e4-999b-38f48cf6cdbe',
                  ]}
                  baseUrl="https://cdn.usegalileo.ai/stability"
                />
              </section>

              {/* Audience Growth Section */}
              <section className="px-4 pb-2 pt-4">
                <h3 className="text-white text-lg font-bold leading-tight tracking-tight">
                  Audience Growth
                </h3>
                <div className="flex flex-wrap gap-4 py-6">
                  {/* Bounce Rate Chart */}
                  <BounceRateChart data={data.bounceRateChartData} />

                  {/* Audience Growth Line Chart */}
                  <AudienceGrowthChart
                    data={data.followersChartData}
                  />
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default AudienceInsights;