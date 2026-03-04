import { Button } from '@stones';
import { MoonIcon, StoneIcon, SunIcon } from 'lucide-react';
import * as React from 'react';

import { Typography } from '@/common/Typography';
import { useTheme } from '@/components/theme-provider';

export const Header: React.FC = () => {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () =>
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  return (
    <div className="w-full h-fit flex flex-row justify-between">
      <div className="flex flex-row items-center gap-4">
        <StoneIcon className="size-6" />
        <Typography className="text-lg font-normal">
          Safwaan Chowdhury
        </Typography>
      </div>

      <div className="flex flex-row gap-6">
        <Button variant="ghost">
          <Typography className="text-base font-light">About</Typography>
        </Button>
        <Button variant="ghost">
          <Typography className="text-base font-light">Resume</Typography>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
        >
          <span className="relative inline-block size-5">
            <SunIcon className="absolute inset-0 size-5 opacity-0 transition-opacity duration-[250ms] ease-in-out dark:opacity-100" />
            <MoonIcon className="absolute inset-0 size-5 opacity-100 transition-opacity duration-[250ms] ease-in-out dark:opacity-0" />
          </span>
        </Button>
      </div>
    </div>
  );
};
