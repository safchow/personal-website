import * as React from 'react';

import { Typography } from '@/common/Typography';
import { EMAIL } from '@/lib/constants';

import { SelectedWork } from './components';

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
          <Typography as="p" className="text-base leading-7 text-foreground/80">
            I&apos;m a Full-Stack Engineer. Here are some of my projects.
          </Typography>

          <SelectedWork />

          <Typography as="p" className="text-base leading-7 text-foreground/80">
            I like meeting people who care about building things well. You can
            reach me by{' '}
            <a href={`mailto:${EMAIL}`} className="link-inline">
              email
            </a>
            .
          </Typography>
        </div>
      </div>
    </div>
  );
};
