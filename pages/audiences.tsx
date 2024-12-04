// pages/audience-insights.tsx
import { NextPage } from 'next';
import Head from 'next/head';
import Header from '../components/Header';
import React from 'react';
import StatCard from '../components/StatCard';
import DemographicsCard from '../components/DemographicsCard';
import AgeGroupCard from '../components/AgeGroupCard';
import ImageGrid from '../components/ImageGrid';
import DynamicAudienceGrowthChart from '../components/DynamicAudienceGrowthChart';
import { FaMale, FaFemale } from 'react-icons/fa'; // Using react-icons for gender icons

const AudienceInsights: NextPage = () => {
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
        <div className="layout-container flex h-full grow flex-col">
          <Header />
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

              {/* Active Audience Section */}
              <section className="px-4 pb-2 pt-4">
                <h3 className="text-white text-lg font-bold leading-tight tracking-tight">
                  Active Audience
                </h3>
                <div className="flex flex-wrap gap-4 py-6">
                  <div className="flex min-w-72 flex-1 flex-col gap-2 rounded-xl border border-[#3b4954] p-6">
                    <p className="text-white text-base font-medium">
                      Daily Active Users
                    </p>
                    <div className="flex flex-1 flex-col gap-8 py-4">
                      {/* SVG Chart */}
                      <svg
                        width="100%"
                        height="148"
                        viewBox="-3 0 478 150"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25V149H326.769H0V109Z"
                          fill="url(#paint0_linear_1131_5935)"
                        ></path>
                        <path
                          d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25"
                          stroke="#9cacba"
                          strokeWidth="3"
                          strokeLinecap="round"
                        ></path>
                        <defs>
                          <linearGradient
                            id="paint0_linear_1131_5935"
                            x1="236"
                            y1="1"
                            x2="236"
                            y2="149"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#283139"></stop>
                            <stop stopColor="#283139" stopOpacity="0"></stop>
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="flex justify-around">
                        {['June 1', 'June 7', 'June 14', 'June 21', 'June 28'].map(
                          (date) => (
                            <p
                              key={date}
                              className="text-[#9cacba] text-[13px] font-bold"
                            >
                              {date}
                            </p>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Metrics Section */}
              <section className="flex flex-wrap gap-4 p-4">
                <StatCard title="Users" value="2,500" />
                <StatCard title="Sessions" value="10,000" />
                <StatCard title="Avg. Session Duration" value="2m 30s" />
                <StatCard title="Bounce Rate" value="35%" />
              </section>

              {/* Audience Demographics Section */}
              <section className="px-4 pb-2 pt-4">
                <h3 className="text-white text-lg font-bold leading-tight tracking-tight">
                  Audience Demographics
                </h3>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
                  <DemographicsCard
                    label="Male"
                    icon={<FaMale size={24} />}
                  />
                  <DemographicsCard
                    label="Female"
                    icon={<FaFemale size={24} />}
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
                  {/* Total Users Chart */}
                  <div className="flex flex-1 flex-col gap-2 rounded-xl border border-[#3b4954] p-6 min-w-72">
                    <p className="text-white text-base font-medium">Total Users</p>
                    <div className="flex flex-1 flex-col gap-8 py-4">
                      {/* SVG Chart */}
                      <svg
                        width="100%"
                        height="148"
                        viewBox="-3 0 478 150"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25V149H326.769H0V109Z"
                          fill="url(#paint0_linear_1131_5935)"
                        ></path>
                        <path
                          d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25"
                          stroke="#9cacba"
                          strokeWidth="3"
                          strokeLinecap="round"
                        ></path>
                        <defs>
                          <linearGradient
                            id="paint0_linear_1131_5935"
                            x1="236"
                            y1="1"
                            x2="236"
                            y2="149"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#283139"></stop>
                            <stop stopColor="#283139" stopOpacity="0"></stop>
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="flex justify-around">
                        {['June 1', 'June 7', 'June 14', 'June 21', 'June 28'].map(
                          (date) => (
                            <p
                              key={date}
                              className="text-[#9cacba] text-[13px] font-bold"
                            >
                              {date}
                            </p>
                          )
                        )}
                      </div>
                    </div>
                  </div>

                  {/* New Users Bar Chart */}
                  <DynamicAudienceGrowthChart
                    data={[
                      { date: 'June 1', value: 90 },
                      { date: 'June 7', value: 60 },
                      { date: 'June 14', value: 40 },
                      { date: 'June 21', value: 0 },
                      { date: 'June 28', value: 70 },
                    ]}
                  />
                </div>
              </section>

              {/* New Users Section */}
              <section className="flex flex-wrap gap-4 px-4 py-6">
                <div className="flex min-w-72 flex-1 flex-col gap-2 rounded-xl border border-[#3b4954] p-6">
                  <p className="text-white text-base font-medium">New Users</p>
                  <div className="grid min-h-[180px] grid-flow-col gap-6 grid-rows-[1fr_auto] items-end justify-items-center px-3">
                    {/* Bars */}
                    {[
                      { height: '90%', label: 'June 1' },
                      { height: '60%', label: 'June 7' },
                      { height: '40%', label: 'June 14' },
                      { height: '0%', label: 'June 21' },
                      { height: '70%', label: 'June 28' },
                    ].map((bar, index) => (
                      <React.Fragment key={index}>
                        <div
                          className="border-t-2 border-[#9cacba] bg-[#283139] w-full"
                          style={{ height: bar.height }}
                        ></div>
                        <p className="text-[#9cacba] text-[13px] font-bold">
                          {bar.label}
                        </p>
                      </React.Fragment>
                    ))}
                  </div>
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
