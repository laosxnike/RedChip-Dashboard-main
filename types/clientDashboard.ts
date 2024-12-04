export interface SerializedEmailPerformance {
  date: string;
  sends: number;
  opens: number;
  clicks: number;
  conversionRate: number;
}

export interface SerializedShortPositionRecord {
  date: string;
  shortVolume: number;
  shortExemptVolume: number;
  totalVolume: number;
}

export interface SerializedOwnership {
  institution: string;
  shares: number;
  change: string;
}

export interface SerializedResearchCoverage {
  date: string;
  firm: string;
  rating: string;
  priceTarget: number;
}

export interface SerializedLandingPageTraffic {
  date: string;
  pageViews: number;
  uniqueVisitors: number;
  conversionRate: number;
}

export interface SerializedWebinarPerformance {
  date: string;
  registrations: number;
  attendance: number;
  conversionRate: number;
}

export interface SerializedStats {
  totalViews: number;
  totalLeads: number;
  leadsToday: number;
}

export interface SerializedFeedback {
  createdAt: string;
  comment: string;
  rating: string;
}

export interface ClientDashboardData {
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
  platformSources: { [key: string]: number };
  advertSources: { [key: string]: number };
  userLocations: {
    regions: { [key: string]: number };
    cities: { [key: string]: number };
  };
  siteNavigation: { [key: string]: number };
  averageSessionDuration: number;
  followersChartData: ChartDataPoint[];
  engagementRateChartData: ChartDataPoint[];
  adImpressionsChartData: ChartDataPoint[];
  ctrChartData: ChartDataPoint[];
  platformInsightsChartData: ChartDataPoint[];
  platformMetrics: PlatformMetric[];
  additionalKPIs: KPI[];
  adPerformance: AdPerformance[];
  engagingPosts: EngagingPost[];
  engagedUsers: EngagedUser[];
  clients: string[];
  googleAnalyticsData?: any;
}

export interface ClientDataDetails {
  stats: {
    records: Array<{
      title: string;
      value: string;
    }>;
  };
  shortPositionRecords: any[];
  ownerships: any[];
  researchCoverages: any[];
  landingPageTraffics: any[];
  webinarPerformances: any[];
  emailPerformances: any[];
  feedbacks: any[];
}

export interface ChartDataPoint {
  date: string;
  value: number;
}

export interface PlatformMetric {
  name: string;
  metrics: { label: string; value: string }[];
}

export interface KPI {
  label: string;
  value: string;
}

export interface AdPerformance {
  platform: string;
  organic: number;
  paid: number;
}

export interface EngagingPost {
  image: string;
  title: string;
}

export interface EngagedUser {
  name: string;
  engagementCount: number;
  avatarUrl: string;
}

export interface DashboardResponse {
  engagementRate: number;
  dailyAverageNewFollowers: number;
  qrCodeEngagement: number;
  bounceRate: number;
  CPA: number;
  conversionRate: number;
  CTR: number;
  newUsers: number;
  totalFollowers: number;
  returningUsers: number;
  sessions: number;
  users: number;
  pageviews: number;
  averageSessionDuration: number;
  followersChartData: ChartDataPoint[];
  bounceRateChartData: ChartDataPoint[];
  CPAChartData: ChartDataPoint[];
  adImpressionsChartData: ChartDataPoint[];
  ctrChartData: ChartDataPoint[];
  platformInsightsChartData: ChartDataPoint[];
  engagementRateChartData: ChartDataPoint[];
  engagingPosts: EngagingPost[];
  engagedUsers: EngagedUser[];
  clients: { symbol: string }[];
  googleAnalyticsData?: any;
  platformSources: any[]; // Replace with actual type if available
} 