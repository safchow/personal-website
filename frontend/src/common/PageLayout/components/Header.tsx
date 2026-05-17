import * as React from 'react';

import { ThemeToggleButton } from './Buttons';

export const Header: React.FC = () => {
  return (
    <div className="flex h-fit w-full flex-row justify-end">
      <div className="flex flex-row gap-2 sm:gap-4">
        <ThemeToggleButton />
      </div>
    </div>
  );
};
