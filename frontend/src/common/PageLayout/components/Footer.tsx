import { Button } from '@stones';
import * as React from 'react';

import { Typography } from '@/common/Typography';

const LINKEDIN_URL = 'https://www.linkedin.com/in/safwaan-hchowdhury/';
const GITHUB_URL = 'https://github.com/safchow';

export const Footer: React.FC = () => {
  return (
    <div className="w-full h-fit flex flex-row justify-between">
      <div className="flex flex-row gap-6">
        <Button variant="ghost">
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
            <Typography className="text-base font-light">LinkedIn</Typography>
          </a>
        </Button>
        <Button asChild variant="ghost">
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
            <Typography className="text-base font-light">GitHub</Typography>
          </a>
        </Button>
      </div>

      <div className="flex flex-row items-center">
        <Typography className="text-xs font-light">@2026</Typography>
      </div>
    </div>
  );
};
