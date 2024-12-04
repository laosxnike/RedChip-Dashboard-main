// components/MostEngagedUsersSection.tsx

import React from 'react';

interface EngagedUser {
  name: string;
  engagementCount: number;
  avatarUrl: string;
}

interface MostEngagedUsersSectionProps {
  users: EngagedUser[];
}

const MostEngagedUsersSection: React.FC<MostEngagedUsersSectionProps> = ({ users }) => {
  if (!users.length) {
    return (
      <section className="my-8">
        <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Most Engaged Users
        </h2>
        <p className="text-gray-500 px-4">No engaged users available.</p>
      </section>
    );
  }

  return (
    <>
      <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        Most Engaged Users
      </h2>
      <div className="flex items-center px-4 py-3 justify-start gap-3">
        {users.map((user, index) => (
          <div key={index} className="overflow-visible w-11">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover border-[#111518] bg-[#283139] text-[#9cacba] rounded-full flex items-center justify-center size-11 border-4"
              style={{ backgroundImage: `url(${user.avatarUrl})` }}
            ></div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MostEngagedUsersSection;
