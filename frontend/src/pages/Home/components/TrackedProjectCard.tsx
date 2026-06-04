import * as React from 'react';

import { Typography } from '@/common/Typography';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { trackEvent } from '@/lib/analytics/trackEvent';
import type { ReadmeProject } from '@/pages/Home/constants';

export const TrackedProjectCard: React.FC<{ project: ReadmeProject }> = ({
  project,
}) => {
  const handleClick = React.useCallback(() => {
    void trackEvent({
      type: 'click',
      target: `project:${project.title}`,
      path: window.location.pathname,
      metadata: {
        destination: project.repoUrl,
      },
    });
  }, [project.repoUrl, project.title]);

  return (
    <a
      href={project.repoUrl}
      target="_blank"
      rel="noreferrer"
      className="group block h-full w-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      aria-label={`View ${project.title} on GitHub`}
      onClick={handleClick}
    >
      <Card className="flex h-full w-full flex-col bg-background/70 shadow-none transition-colors hover:border-foreground/24 hover:bg-foreground/[0.025]">
        <CardHeader className="space-y-4 p-5">
          <CardTitle className="text-xl font-medium tracking-tight">
            {project.title}
          </CardTitle>
          <Typography as="p" className="text-sm leading-6 text-foreground/68">
            {project.description}
          </Typography>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col px-5 pb-5 pt-0" />
      </Card>
    </a>
  );
};
