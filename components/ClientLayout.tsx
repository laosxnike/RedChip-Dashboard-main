// components/ClientLayout.tsx

import React from 'react';
import Header from './Header';

interface ClientLayoutProps {
  children: React.ReactNode;
  client: string;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children, client }) => {
  return (
    <div className="relative flex min-h-screen flex-col bg-[#111518] overflow-x-hidden">
      <div className="flex h-full grow flex-col">
        <Header />
        <main className="flex-1 container mx-auto py-5 px-6">
          <div className="flex flex-col max-w-[960px] flex-1 mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ClientLayout;
