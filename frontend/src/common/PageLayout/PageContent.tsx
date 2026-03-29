import * as React from 'react';

interface PageContentProps {
  children: React.ReactNode;
}

export const PageContent: React.FC<PageContentProps> = ({ children }) => {
  return <div className="flex flex-1 min-h-0 overflow-hidden">{children}</div>;
};
