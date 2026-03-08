import * as React from 'react';

import { Typography } from '@/common/Typography';
import { useIsMobile } from '@/hooks';

import {
  EmailButton,
  GitHubButton,
  LinkedInButton,
  ResumeButton,
} from './Buttons';

export const Footer: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <div className="w-full h-fit flex flex-row items-center max-md:justify-between max-md:gap-4 min-[768px]:justify-end min-[768px]:gap-0">
      {isMobile && (
        <div className="flex flex-row gap-4">
          <EmailButton />
          <ResumeButton />
          <GitHubButton />
          <LinkedInButton />
        </div>
      )}
      <Typography className="text-sm font-light">@2026</Typography>
    </div>
  );
};
