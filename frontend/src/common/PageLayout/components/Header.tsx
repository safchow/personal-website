import { Link } from '@tanstack/react-router';
import { StoneIcon } from 'lucide-react';
import * as React from 'react';

import { Typography } from '@/common/Typography';
import { useIsMobile } from '@/hooks';

import {
  EmailButton,
  GitHubButton,
  LinkedInButton,
  ResumeButton,
  ThemeToggleButton,
} from './Buttons';

export const Header: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <div className="w-full h-fit flex flex-row justify-between">
      <Link
        to="/"
        className="flex flex-row items-center gap-4 rounded-md transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        aria-label="Go to homepage"
      >
        <StoneIcon className="size-6 shrink-0" />
        <Typography className="text-lg font-normal">
          Safwaan Chowdhury
        </Typography>
      </Link>

      <div className="flex flex-row gap-4">
        {/* <Button variant="ghost">
          <Typography className="text-base font-light">About</Typography>
        </Button> */}

        {!isMobile && (
          <>
            <EmailButton />
            <ResumeButton />
            <GitHubButton />
            <LinkedInButton />
          </>
        )}

        <ThemeToggleButton />
      </div>
    </div>
  );
};
