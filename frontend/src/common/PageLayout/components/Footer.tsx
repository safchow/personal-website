import { Button } from '@stones';
import * as React from 'react';

import { Typography } from '@/common/Typography';

export const Footer: React.FC = () => {
  return (
    <div className="w-full h-fit flex flex-row justify-between">
      <div className="flex flex-row gap-6">
        <Button variant="link">
          <Typography className="text-base font-medium">Email</Typography>
        </Button>
        <Button variant="link">
          <Typography className="text-base font-medium">LinkedIn</Typography>
        </Button>
        <Button variant="link">
          <Typography className="text-base font-medium">GitHub</Typography>
        </Button>
      </div>

      <div>
        <Typography className="text-sm">@2026</Typography>
      </div>
    </div>
  );
};
