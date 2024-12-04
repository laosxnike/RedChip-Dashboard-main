import React from 'react';
import MetricCard from '../MetricCard';
import Stats from './Stats';
import ShortPositions from './ShortPositions';
import Ownership from './Ownership';
import ResearchCoverage from './ResearchCoverage';
import LandingPageTraffic from './LandingPageTraffic';
import WebinarPerformance from './WebinarPerformance';
import EmailPerformance from './EmailPerformance';
import Feedback from './Feedback';
import { ClientDashboardData, ClientDataDetails } from '../../types/clientDashboard';

interface OverviewProps {
  dashboardData: ClientDashboardData;
  clientDataDetails: ClientDataDetails;
  client: string;
}

const Overview: React.FC<OverviewProps> = ({ dashboardData, clientDataDetails, client }) => {
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard title="Bounce Rate" value={dashboardData.bounceRate} unit="%" />
        <MetricCard title="CPA" value={dashboardData.CPA} unit="$" />
        <MetricCard title="Conversion Rate" value={dashboardData.conversionRate} unit="%" />
        <MetricCard title="CTR" value={dashboardData.CTR} unit="%" />
      </div>
      <div className="space-y-8">
        <Stats data={clientDataDetails.stats} />
        <ShortPositions data={clientDataDetails.shortPositionRecords} />
        <Ownership data={clientDataDetails.ownerships} />
        <ResearchCoverage data={clientDataDetails.researchCoverages} />
        <LandingPageTraffic data={clientDataDetails.landingPageTraffics} />
        <WebinarPerformance data={clientDataDetails.webinarPerformances} />
        <EmailPerformance data={clientDataDetails.emailPerformances} />
        <Feedback data={clientDataDetails.feedbacks} />
      </div>
    </div>
  );
};

export default Overview;
