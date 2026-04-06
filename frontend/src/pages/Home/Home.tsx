import * as React from 'react';

import { Typography } from '@/common/Typography';
import { EMAIL, GITHUB_URL, LINKEDIN_URL, RESUME_URL } from '@/lib/constants';

import { ExpandingMenu } from './components';

export const Home: React.FC = () => {
  return (
    <div className="flex flex-1 min-h-0 overflow-hidden">
      <div className="flex w-full flex-col justify-center pt-12 lg:pt-0">
        <div className="mb-6 flex items-center gap-4 sm:mb-8">
          <Typography className="text-2xl font-medium">
            Hey, I&apos;m Safwaan!
          </Typography>
        </div>

        <div className="flex flex-col gap-4">
          <Typography className="text-sm text-foreground/80">
            I build full-stack TypeScript products, from backend services to
            React interfaces. I&apos;m currently a Full-Stack Engineer at{' '}
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

          <Typography className="text-sm text-foreground/80">
            These case studies highlight a few parts of my work. You can explore
            more on{' '}
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="link-inline"
            >
              GitHub
            </a>{' '}
            or view my{' '}
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="link-inline"
            >
              resume
            </a>
            .
          </Typography>

          <div className="flex h-[24rem] py-4 sm:h-[28rem]">
            <ExpandingMenu />
          </div>

          <Typography className="text-sm text-foreground/80">
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
    </div>
  );
};
