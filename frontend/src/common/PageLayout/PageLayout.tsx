import * as React from 'react';

import { Footer, Header } from './components';

interface PageLayoutProps {
  children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col justify-between min-h-screen px-20 py-8 gap-8">
      <div className="animate-fade-in [animation-delay:0ms]">
        <Header />
      </div>
      <div className="flex flex-1 min-h-0 justify-center animate-fade-in opacity-0 [animation-delay:100ms]">
        {children}
      </div>
      <div className="animate-fade-in opacity-0 [animation-delay:200ms]">
        <Footer />
      </div>
    </div>
  );
};
