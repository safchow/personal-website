import { StoneIcon } from 'lucide-react';
import * as React from 'react';

import { Typography } from '@/common/Typography';

import {
  EmailButton,
  GitHubButton,
  LinkedInButton,
  ResumeButton,
  ThemeToggleButton,
} from './Buttons';

export const Header: React.FC = () => {
  return (
    <div className="w-full h-fit flex flex-row justify-between">
      <div className="flex flex-row items-center gap-4">
        <StoneIcon className="size-6 shrink-0" />
        <Typography className="text-lg font-normal">
          Safwaan Chowdhury
        </Typography>
      </div>

      <div className="flex flex-row gap-4">
        {/* <Button variant="ghost">
          <Typography className="text-base font-light">About</Typography>
        </Button> */}

        <EmailButton />
        <ResumeButton />
        <GitHubButton />
        <LinkedInButton />
        <ThemeToggleButton />
      </div>
    </div>
  );
};
