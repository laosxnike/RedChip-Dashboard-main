import React from 'react';

interface EngagedUser {
  avatarUrl: React.ReactNode;
  name: string;
  engagement: {
    likes?: number;
    comments?: number;
    shares?: number;
  };
  platform: string;
}

interface EngagedUserCardProps {
  user: EngagedUser;
}

const EngagedUserCard: React.FC<EngagedUserCardProps> = ({ user }) => {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-[#3b4954] bg-[#1a1d1f] p-4">
      <div className="relative h-11 w-11">
        {user.avatarUrl}
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-white text-sm font-medium">{user.name}</p>
        <div className="flex gap-3 text-[#9cacba] text-xs">
          {user.engagement.likes && (
            <span>{user.engagement.likes} likes</span>
          )}
          {user.engagement.comments && (
            <span>{user.engagement.comments} comments</span>
          )}
          {user.engagement.shares && (
            <span>{user.engagement.shares} shares</span>
          )}
        </div>
        <span className="text-[#9cacba] text-xs">{user.platform}</span>
      </div>
    </div>
  );
};

export default EngagedUserCard; 