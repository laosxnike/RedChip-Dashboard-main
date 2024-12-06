import React from 'react';
import DynamicLineChart from '../components/DynamicLineChart';
import PlatformMetrics from '../components/PlatformMetrics';
import type { ChartOptions } from 'chart.js';
import { 
  YoutubeIcon, 
  LinkedinIcon, 
  InstagramIcon, 
  FacebookIcon 
} from 'lucide-react'; // or your preferred icon library
import TopMetricsSection from '../components/TopMetricsSection';
import EngagingPostCard from '../components/EngagingPostCard';
import EngagedUserCard from '../components/EngagedUserCard';
import Avatar from 'boring-avatars';
import ClientsSection from '../components/ClientsSection';
import Header from '../components/Header';
import Head from 'next/head';
import DashboardCharts from '../components/DashboardCharts';

interface MetricCardProps {
  title: string;
  value: string;
}

interface PlatformMetricProps {
  platform: string;
  metrics: { label: string; value: string }[];
}

interface EngagedUser {
  avatarUrl: React.ReactNode;
  name: string;
  engagement: {
    likes: number;
    comments: number;
    shares: number;
  };
  platform: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value }) => (
  <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-[#3b4954]">
    <p className="text-white text-base font-medium leading-normal">{title}</p>
    <p className="text-white tracking-light text-2xl font-bold leading-tight">{value}</p>
  </div>
);

const Chart: React.FC<{ title: string }> = ({ title }) => (
  <div className="flex min-w-72 flex-1 flex-col gap-2">
    <p className="text-white text-base font-medium leading-normal">{title}</p>
    <div className="flex min-h-[180px] flex-1 flex-col gap-8 py-4">
      <svg width="100%" height="148" viewBox="-3 0 478 150" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path
          d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25V149H326.769H0V109Z"
          fill="url(#paint0_linear_1131_5935)"
        />
        <path
          d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25"
          stroke="#9cacba"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="paint0_linear_1131_5935" x1="236" y1="1" x2="236" y2="149" gradientUnits="userSpaceOnUse">
            <stop stopColor="#283139" />
            <stop offset="1" stopColor="#283139" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <div className="flex justify-around">
        <p className="text-[#9cacba] text-[13px] font-bold leading-normal tracking-[0.015em]">Jul 1</p>
        <p className="text-[#9cacba] text-[13px] font-bold leading-normal tracking-[0.015em]">Jul 8</p>
        <p className="text-[#9cacba] text-[13px] font-bold leading-normal tracking-[0.015em]">Jul 15</p>
        <p className="text-[#9cacba] text-[13px] font-bold leading-normal tracking-[0.015em]">Jul 22</p>
        <p className="text-[#9cacba] text-[13px] font-bold leading-normal tracking-[0.015em]">Jul 29</p>
      </div>
    </div>
  </div>
);

const LocalPlatformMetrics: React.FC<PlatformMetricProps> = ({ platform, metrics }) => (
  <>
    <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">{platform}</h3>
    <div className="p-4 grid grid-cols-[20%_1fr] gap-x-6">
      {metrics.map((metric, index) => (
        <div key={index} className="col-span-2 grid grid-cols-subgrid border-t border-t-[#3b4954] py-5">
          <p className="text-[#9cacba] text-sm font-normal leading-normal">{metric.label}</p>
          <p className="text-white text-sm font-normal leading-normal">{metric.value}</p>
        </div>
      ))}
    </div>
  </>
);

interface EngagingPost {
  imageUrl: string;
  title: string;
  engagement?: {
    likes?: number;
    comments?: number;
    shares?: number;
  };
}

interface Client {
  symbol: string;
}

const ClientTag: React.FC<{ symbol: string }> = ({ symbol }) => (
  <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-[#283139] px-4">
    <p className="text-white text-sm font-medium leading-normal">{symbol}</p>
  </div>
);

interface TopMetric {
  title: string;
  value: string;
  change: {
    value: string;
    trend: 'up' | 'down';
  };
}

interface TopMetricsSectionProps {
  metrics: TopMetric[];
}

const AnalyticsDashboard: React.FC = () => {
  const topMetrics = [
    { 
      title: "Total followers", 
      value: "19.2K",
      change: { value: "12%", trend: "up" as const }
    },
    { 
      title: "New followers", 
      value: "1,589",
      change: { value: "8%", trend: "up" as const }
    },
    { 
      title: "Engagement rate", 
      value: "3.1%",
      change: { value: "0.5%", trend: "up" as const }
    },
    { 
      title: "Daily average new followers", 
      value: "53",
      change: { value: "5%", trend: "down" as const }
    },
    { 
      title: "QR Code Engagement", 
      value: "500",
      change: { value: "15%", trend: "up" as const }
    }
  ];

  const platformData = {
    youtube: {
      metrics: [
        {
          label: "Video Views",
          value: "120.5K",
          change: { value: "12%", trend: "up" as const },
          chartData: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            data: [30, 40, 35, 50, 49, 60]
          }
        },
        {
          label: "Watch Time",
          value: "500K min",
          change: { value: "8%", trend: "up" as const },
          chartData: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            data: [20, 25, 30, 35, 40, 45]
          }
        },
        {
          label: "Subscribers",
          value: "45.2K",
          change: { value: "5%", trend: "up" as const },
          chartData: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            data: [10, 15, 20, 25, 30, 35]
          }
        },
        {
          label: "Avg. View Duration",
          value: "4:35",
          change: { value: "2%", trend: "down" as const },
          chartData: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            data: [40, 38, 42, 35, 37, 36]
          }
        },
        {
          label: "Engagement Rate",
          value: "8.7%",
          change: { value: "3%", trend: "up" as const },
          chartData: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            data: [5, 7, 6, 8, 7, 9]
          }
        },
        {
          label: "New Videos",
          value: "12",
          change: { value: "20%", trend: "up" as const },
          chartData: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            data: [2, 3, 2, 4, 3, 4]
          }
        }
      ],
      icon: <YoutubeIcon className="w-6 h-6 text-red-500" />,
      color: "#FF0000"
    },
    linkedin: {
      metrics: [
        {
          label: "Post Impressions",
          value: "89.2K",
          change: { value: "15%", trend: "up" as const },
          chartData: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            data: [20, 25, 30, 35, 40, 45]
          }
        },
        {
          label: "Engagement Rate",
          value: "5.8%",
          change: { value: "2%", trend: "up" as const },
          chartData: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            data: [3, 4, 3.5, 5, 4.8, 6]
          }
        },
        {
          label: "Profile Views",
          value: "12.4K",
          change: { value: "10%", trend: "up" as const },
          chartData: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            data: [8, 10, 9, 12, 11, 14]
          }
        }
      ],
      icon: <LinkedinIcon className="w-6 h-6 text-blue-500" />,
      color: "#0077B5"
    },
    instagram: {
      metrics: [
        {
          label: "Likes",
          value: "150K",
          change: { value: "10%", trend: "up" as const },
          chartData: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            data: [50, 60, 55, 70, 65, 80]
          }
        },
        {
          label: "Comments",
          value: "12K",
          change: { value: "5%", trend: "up" as const },
          chartData: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            data: [10, 12, 11, 14, 13, 15]
          }
        },
      ],
      icon: <InstagramIcon className="w-6 h-6 text-pink-500" />,
      color: "#E1306C"
    },
    facebook: {
      metrics: [
        {
          label: "Reactions",
          value: "200K",
          change: { value: "8%", trend: "up" as const },
          chartData: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            data: [70, 80, 75, 90, 85, 100]
          }
        },
        {
          label: "Shares",
          value: "30K",
          change: { value: "3%", trend: "up" as const },
          chartData: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            data: [5, 6, 5.5, 7, 6.5, 8]
          }
        },
      ],
      icon: <FacebookIcon className="w-6 h-6 text-blue-600" />,
      color: "#1877F2"
    },
    x: {
      metrics: [
        {
          label: "Tweets",
          value: "50K",
          change: { value: "7%", trend: "up" as const },
          chartData: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            data: [15, 18, 17, 20, 19, 22]
          }
        },
        {
          label: "Retweets",
          value: "10K",
          change: { value: "4%", trend: "up" as const },
          chartData: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            data: [3, 4, 3.5, 5, 4.5, 6]
          }
        },
      ],
      icon: <svg className="w-6 h-6 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557a9.93 9.93 0 01-2.828.775 4.932 4.932 0 002.165-2.724 9.864 9.864 0 01-3.127 1.195 4.916 4.916 0 00-8.384 4.482A13.94 13.94 0 011.671 3.149a4.916 4.916 0 001.523 6.573 4.902 4.902 0 01-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.935 4.935 0 01-2.224.084 4.918 4.918 0 004.6 3.417A9.867 9.867 0 010 19.54a13.94 13.94 0 007.548 2.212c9.142 0 14.307-7.721 13.995-14.646A9.936 9.936 0 0024 4.557z"/></svg>,
      color: "#1DA1F2"
    }
  };

  const engagingPosts: EngagingPost[] = [
    {
      imageUrl: "https://cdn.usegalileo.ai/sdxl10/c3f95adc-5761-422a-ba8f-1db4c7dcda7f.png",
      title: "Title: A great day for chips",
      engagement: {
        likes: 1234,
        comments: 56,
        shares: 78
      }
    },
    {
      imageUrl: "https://cdn.usegalileo.ai/sdxl10/ebb6c9b4-b7b7-4e47-8c06-c762735454e1.png",
      title: "Title: Chip and dip"
    },
    {
      imageUrl: "https://cdn.usegalileo.ai/sdxl10/510c034b-ad8f-4ce8-aafa-e9fa04b03c5c.png",
      title: "Title: The best chips in the world"
    },
    {
      imageUrl: "https://cdn.usegalileo.ai/sdxl10/41b24049-3d2e-41fc-9113-658ebdab7277.png",
      title: "Title: What is the best chip?"
    },
    {
      imageUrl: "https://cdn.usegalileo.ai/sdxl10/6ab09e1c-c25f-45e3-861a-c18d2803a14e.png",
      title: "Title: Chip"
    }
  ];

  const clients: Client[] = [
    { symbol: "GOOG" },
    { symbol: "AAPL" },
    { symbol: "MSFT" },
    { symbol: "AMZN" },
    { symbol: "FB" },
    { symbol: "NFLX" },
    { symbol: "TSLA" },
    { symbol: "NVDA" },
    { symbol: "PYPL" },
    { symbol: "INTC" }
  ];

  const lineChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Visitors',
        data: [65, 59, 80, 81, 56, 55],
        borderColor: '#4bc0c0',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const dailyActiveUsersData = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: 'Daily Active Users',
        data: [300, 500, 800, 600, 700, 900, 1000],
        borderColor: '#9CACBA',
        backgroundColor: 'rgba(156, 172, 186, 0.2)',
      },
    ],
  };

  const dailyActiveUsersOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const engagedUsers: EngagedUser[] = [
    {
      avatarUrl: <Avatar size={44} name="John Smith" variant="beam" />,
      name: "John Smith",
      engagement: {
        likes: 1234,
        comments: 56,
        shares: 23
      },
      platform: "Instagram"
    },
    {
      avatarUrl: <Avatar size={44} name="Emma Wilson" variant="beam" />,
      name: "Emma Wilson",
      engagement: {
        likes: 987,
        comments: 43,
        shares: 15
      },
      platform: "LinkedIn"
    },
    {
      avatarUrl: <Avatar size={44} name="Michael Chen" variant="beam" />,
      name: "Michael Chen",
      engagement: {
        likes: 2156,
        comments: 89,
        shares: 45
      },
      platform: "Facebook"
    },
    {
      avatarUrl: <Avatar size={44} name="Sarah Johnson" variant="beam" />,
      name: "Sarah Johnson",
      engagement: {
        likes: 1567,
        comments: 72,
        shares: 31
      },
      platform: "Twitter"
    }
  ];

  return (
    <>
      <Head>
        <title>RedChip Analytics Dashboard</title>
        <meta name="description" content="Comprehensive analytics dashboard showing website stats, social media, and advertising performance" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className="relative flex min-h-screen flex-col bg-[#111518] overflow-x-hidden"
        style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
      >
        <div className="flex h-full grow flex-col">
          <Header />
          <div className="px-40 flex flex-1 justify-center py-5">
            <div className="flex flex-col max-w-[960px] flex-1">
              <div className="flex flex-wrap justify-between gap-3 p-4">
                <div className="flex min-w-72 flex-col gap-3">
                  <p className="text-white tracking-light text-[32px] font-bold leading-tight">RedChip's Intricate Analytics</p>
                  <p className="text-[#9cacba] text-sm font-normal leading-normal">Website stats, social media, and advertising performance</p>
                </div>
              </div>

              <TopMetricsSection />

              <div className="flex flex-wrap gap-4 px-4 py-6">
                <DashboardCharts />
              </div>

              <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Platform-Specific Metrics</h2>
              {Object.entries(platformData).map(([platform, data]) => (
                <PlatformMetrics
                  key={platform}
                  platform={platform.charAt(0).toUpperCase() + platform.slice(1)}
                  metrics={data.metrics}
                  icon={data.icon}
                  color={data.color}
                />
              ))}

              <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Most Engaging Posts</h2>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
                {engagingPosts.map((post, index) => (
                  <EngagingPostCard key={index} {...post} />
                ))}
              </div>

              <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Most Engaged Users</h2>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-3 p-4">
                {engagedUsers.map((user, index) => (
                  <EngagedUserCard key={index} user={user} />
                ))}
              </div>

              <ClientsSection />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnalyticsDashboard;