import * as React from 'react';

import { Typography } from '@/common/Typography';

export const Footer: React.FC = () => {
  return (
    <div className="w-full h-fit flex flex-row items-center justify-end">
      <Typography className="text-base font-light">@2026</Typography>
    </div>
  );
};
