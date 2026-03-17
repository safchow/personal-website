import * as React from 'react';

import { PageLayout } from '@/common/PageLayout/PageLayout';
import { Typography } from '@/common/Typography';

import { ExpandingMenu } from './components';

export const Home: React.FC = () => {
  return (
    <PageLayout>
      <div className="flex flex-col lg:flex-row flex-1 min-h-0 gap-24 overflow-hidden">
        <HomeContent />
        <ExpandingMenu />
      </div>
    </PageLayout>
  );
};

export const HomeContent: React.FC = () => {
  return (
    <div className="flex flex-col items-center text-center justify-center w-full lg:w-1/2 pt-12 lg:pt-0">
      <Typography className="text-2xl sm:text-3xl md:text-4xl font-medium mb-6 sm:mb-8">
        Building systems that last.
      </Typography>
      <Typography className="text-sm mb-4">
        I build full-stack TypeScript products, from backend services to React
        interfaces.
      </Typography>
      <Typography className="text-sm">
        Currently a Full-Stack Engineer at{' '}
        <a
          href="https://relayfi.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="link-inline"
        >
          Relay Financial
        </a>
        .
      </Typography>
    </div>
  );
};
