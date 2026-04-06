import { Link } from '@tanstack/react-router';
import * as React from 'react';

import { Typography } from '@/common/Typography';

import { ResumeButton, ThemeToggleButton } from './Buttons';

export const Header: React.FC = () => {
  return (
    <div className="flex h-fit w-full flex-row justify-between">
      <Link
        to="/"
        className="flex flex-row items-center gap-4 rounded-md transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        aria-label="Go to homepage"
      >
        <Typography className="text-sm sm:text-md font-normal">Home</Typography>
      </Link>

      <div className="flex flex-row gap-2 sm:gap-4">
        <ResumeButton />
        <ThemeToggleButton />
      </div>
    </div>
  );
};
