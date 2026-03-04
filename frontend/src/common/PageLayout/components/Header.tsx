import { Button } from '@stones';
import { StoneIcon, SunMoonIcon } from 'lucide-react';
import * as React from 'react';

import { Typography } from '@/common/Typography';

export const Header: React.FC = () => {
  return (
    <div className="w-full h-fit flex flex-row justify-between px-20 py-8">
      <div className="flex flex-row gap-4">
        <StoneIcon />
        <Typography fontSize={18} fontWeight="medium">
          Safwaan Chowdhury
        </Typography>
      </div>

      <div className="flex flex-row gap-6">
        <Button variant="link">
          <Typography fontSize={18} fontWeight="medium">
            About
          </Typography>
        </Button>
        <Button variant="link">
          <Typography fontSize={18} fontWeight="medium">
            Resume
          </Typography>
        </Button>
        <Button variant="ghost" size="icon">
          <SunMoonIcon />
        </Button>
      </div>
    </div>
  );
};
