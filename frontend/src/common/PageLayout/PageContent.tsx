import * as React from 'react';

interface PageContentProps {
  children: React.ReactNode;
}

export const PageContent: React.FC<PageContentProps> = ({ children }) => {
  return <div className="flex min-h-0 w-full flex-1 flex-col">{children}</div>;
};
