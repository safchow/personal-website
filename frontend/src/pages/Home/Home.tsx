import * as React from 'react';

import { PageContent } from '@/common/PageLayout/PageContent';
import { Typography } from '@/common/Typography';
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from '@/lib/constants';

import { ExpandingMenu } from './components';

export const Home: React.FC = () => {
  return (
    <PageContent>
      <div className="flex flex-col lg:flex-row flex-1 min-h-0 gap-24 overflow-hidden">
        <HomeContent />
        <ExpandingMenu />
      </div>
    </PageContent>
  );
};

export const HomeContent: React.FC = () => {
  return (
    <div className="flex flex-col justify-center w-full lg:w-1/2 pt-12 lg:pt-0">
      <div className="mb-6 flex items-center gap-4 sm:mb-8">
        <Typography className="text-2xl sm:text-3xl font-medium">
          Hey, I&apos;m Safwaan!
        </Typography>
      </div>

      <div className="flex flex-col gap-4">
        <Typography className="text-sm">
          I build full-stack TypeScript products, from backend services to React
          interfaces. I&apos;m currently a Full-Stack Engineer at{' '}
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

        <Typography className="text-sm">
          These case studies highlight a few parts of my work. You can explore
          more on{' '}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="link-inline"
          >
            GitHub
          </a>
          .
        </Typography>

        <Typography className="text-sm">
          I like meeting people who care about building things well. You can{' '}
          <a href={`mailto:${EMAIL}`} className="link-inline">
            email me
          </a>{' '}
          or find me on{' '}
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="link-inline"
          >
            LinkedIn
          </a>
          .
        </Typography>
      </div>
    </div>
  );
};
