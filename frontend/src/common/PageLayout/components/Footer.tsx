import { Button } from '@stones';
import * as React from 'react';

import { Typography } from '@/common/Typography';

export const Footer: React.FC = () => {
  return (
    <div className="w-full h-fit flex flex-row justify-between">
      <div className="flex flex-row gap-6">
        <Button variant="ghost">
          <Typography className="text-base font-light">Email</Typography>
        </Button>
        <Button variant="ghost">
          <Typography className="text-base font-light">LinkedIn</Typography>
        </Button>
        <Button variant="ghost">
          <Typography className="text-base font-light">GitHub</Typography>
        </Button>
      </div>

      <div className="flex flex-row items-center">
        <Typography className="text-xs font-light">@2026</Typography>
      </div>
    </div>
  );
};
