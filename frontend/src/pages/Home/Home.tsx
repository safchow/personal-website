import * as React from 'react';

import { PageLayout } from '@/common/PageLayout/PageLayout';
import { Typography } from '@/common/Typography';

// import { ExpandingMenu } from './components';

export const Home: React.FC = () => {
  return (
    <PageLayout>
      <div className="flex flex-1 min-h-0 items-center justify-center">
        <div className="flex flex-col items-center text-center">
          <Typography className="text-3xl sm:text-4xl md:text-5xl font-medium mb-6 md:mb-8">
            Building systems that last.
          </Typography>
          <Typography className="mb-4">
            I build full-stack TypeScript products, from backend services to
            React interfaces.
          </Typography>
          <Typography>
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
      </div>
      {/* ExpandingMenu - uncomment when case studies are ready
      <div className="flex flex-1 min-h-0 overflow-x-auto">
        <div className="flex flex-row gap-20 items-stretch w-full min-w-0 h-full">
          <div className="flex flex-shrink-0 flex-col items-start justify-center">...</div>
          <div className="flex flex-1 min-h-0 overflow-hidden">
            <ExpandingMenu />
          </div>
        </div>
      </div>
      */}
    </PageLayout>
  );
};
