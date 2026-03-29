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
      <div className="h-full w-full overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="mx-auto flex w-full max-w-4xl flex-col pr-1">
          <article className="space-y-10 pb-10">{children}</article>
        </div>
      </div>
    </PageContent>
  );
};
