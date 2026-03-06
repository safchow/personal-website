import * as React from 'react';

import { PageLayout } from '@/common/PageLayout/PageLayout';

import { ExpandingMenu } from './components';

export const Home: React.FC = () => {
  return (
    <PageLayout>
      <ExpandingMenu />
    </PageLayout>
  );
};
