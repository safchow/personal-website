import * as React from 'react';

import { PageContent } from '@/common/PageLayout/PageContent';

interface CaseStudyLayoutProps {
  children: React.ReactNode;
}

export const CaseStudyLayout: React.FC<CaseStudyLayoutProps> = ({
  children,
}) => {
  return (
    <PageContent>
      <div className="mx-auto flex w-full max-w-4xl flex-col">
        <article className="space-y-10 pb-10">{children}</article>
      </div>
    </PageContent>
  );
};
