import { Button } from '@stones';
import { StoneIcon, SunMoonIcon } from 'lucide-react';
import * as React from 'react';

import { Typography } from '@/common/Typography';

export const Header: React.FC = () => {
  return (
    <div className="w-full h-fit flex flex-row justify-between">
      <div className="flex flex-row gap-4">
        <StoneIcon />
        <Typography className="text-lg font-medium">
          Safwaan Chowdhury
        </Typography>
      </div>

      <div className="flex flex-row gap-6">
        <Button variant="link">
          <Typography className="text-base font-medium">About</Typography>
        </Button>
        <Button variant="link">
          <Typography className="text-base font-medium">Resume</Typography>
        </Button>
        <Button variant="ghost" size="icon">
          <SunMoonIcon />
        </Button>
      </div>
    </div>
  );
};
