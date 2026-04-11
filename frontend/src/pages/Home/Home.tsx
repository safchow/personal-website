import * as React from 'react';

import { Typography } from '@/common/Typography';
import { EMAIL, LINKEDIN_URL } from '@/lib/constants';

import { ExpandingMenu } from './components';

export const Home: React.FC = () => {
  return (
    <div className="flex flex-1 min-h-0 overflow-hidden">
      <div className="flex w-full flex-col justify-center">
        <div className="flex flex-col gap-8">
          {/* Header */}
          <div className="flex items-center">
            <Typography className="text-2xl font-medium">
              Hey, I&apos;m Safwaan!
            </Typography>
          </div>

          {/* Body */}
          <Typography className="text-base text-foreground/80">
            I&apos;m currently a Full-Stack Engineer at{' '}
            <a
              href="https://relayfi.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="link-inline"
            >
              Relay Financial
            </a>
            . These case studies highlight my work.
          </Typography>

          <ExpandingMenu />

          <Typography className="text-base text-foreground/80">
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
