import * as React from 'react';

import { Footer, Header } from './components';

interface PageLayoutProps {
  children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-[100dvh] min-h-[100dvh] flex-col justify-between overflow-hidden px-8 lg:px-16 py-6 md:py-8 gap-6 md:gap-8">
      <div className="animate-fade-in [animation-delay:0ms]">
        <Header />
      </div>
      <div className="flex flex-1 min-h-0 overflow-hidden animate-fade-in opacity-0 [animation-delay:100ms]">
        {children}
      </div>
      <div className="animate-fade-in opacity-0 [animation-delay:200ms]">
        <Footer />
      </div>
    </div>
  );
};
