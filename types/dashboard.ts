import { JsonValue } from 'type-fest';

export interface Metric {
  platform: string;
  label: string;
  value: string;
}

export interface ChartDataSet {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
}

export interface ChartDataStructure {
  labels: string[];
  datasets: ChartDataSet[];
}

export interface EngagingPost {
  imageUrl: string;
  title: string;
}

export interface Client {
  symbol: string;
}

export interface DashboardData {
  id: string;
  bounceRate: number;
  CPA: number;
  conversionRate: number;
  CTR: number;
  sessionDuration: number;
  totalFollowers: number;
  newFollowers: number;
  engagementRate: number;
  newUsers: number;
  createdAt: Date;
  updatedAt: Date;
  date: Date;
  platformData: {
    [key: string]: Metric[];
  };
  engagingPosts: EngagingPost[];
  clients: Client[];
  charts: {
    [key: string]: ChartDataStructure;
  };
  // Add other necessary properties here
}
