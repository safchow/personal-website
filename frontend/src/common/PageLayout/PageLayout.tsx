import * as React from 'react';

import { Footer, Header } from './components';

interface PageLayoutProps {
  children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col justify-between min-h-screen px-20 py-8">
      <Header />
      {children}
      <Footer />
    </div>
  );
};
