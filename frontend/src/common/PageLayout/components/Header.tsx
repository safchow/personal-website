import { Link } from '@tanstack/react-router';
import * as React from 'react';

import { Typography } from '@/common/Typography';

import { ThemeToggleButton } from './Buttons';

export const Header: React.FC = () => {
  return (
    <div className="flex h-fit w-full flex-row justify-between">
      <div className="flex flex-row items-center gap-4">
        <Link
          to="/"
          className="transition-opacity hover:opacity-80"
          aria-label="Go to homepage"
        >
          <Typography className="text-sm font-normal">Home</Typography>
        </Link>
      </div>

      <div className="flex flex-row gap-2 sm:gap-4">
        <ThemeToggleButton />
      </div>
    </div>
  );
};
