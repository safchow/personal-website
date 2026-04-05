import { Link } from '@tanstack/react-router';
import { StoneIcon } from 'lucide-react';
import * as React from 'react';

import { Typography } from '@/common/Typography';
import { useIsMobile } from '@/hooks';

import {
  GitHubButton,
  LinkedInButton,
  ResumeButton,
  ThemeToggleButton,
} from './Buttons';
import { MobileMenuDrawer } from './MobileMenuDrawer';

export const Header: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <div className="flex h-fit w-full flex-row justify-between">
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

      <div className="flex flex-row gap-2 sm:gap-4">
        {!isMobile && (
          <>
            <ResumeButton />
            <GitHubButton />
            <LinkedInButton />
          </>
        )}

        <ThemeToggleButton />

        {isMobile && <MobileMenuDrawer />}
      </div>
    </div>
  );
};
