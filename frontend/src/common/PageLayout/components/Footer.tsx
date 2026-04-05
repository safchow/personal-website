import * as React from 'react';

import { Typography } from '@/common/Typography';

export const Footer: React.FC = () => {
  return (
    <div className="flex h-fit w-full flex-row items-center justify-end">
      <Typography className="text-sm font-light">@2026</Typography>
    </div>
  );
};
