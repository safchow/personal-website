import * as React from 'react';

import { Typography } from '@/common/Typography';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { README_PROJECTS, type ReadmeProject } from '@/pages/Home/constants';

const ReadmeProjectCard: React.FC<{ project: ReadmeProject }> = ({
  project,
}) => {
  return (
    <a
      href={project.repoUrl}
      target="_blank"
      rel="noreferrer"
      className="group block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      aria-label={`View ${project.title} on GitHub`}
    >
      <Card className="flex h-full flex-col gap-3 rounded-2xl border border-border/70 bg-background/70 p-5 shadow-none transition-colors hover:border-foreground/30 hover:bg-foreground/[0.03]">
        <CardHeader className="space-y-3 p-0">
          <CardTitle className="text-lg font-medium tracking-tight">
            {project.title}
          </CardTitle>
          <Typography as="p" className="text-sm leading-6 text-foreground/60">
            {project.description}
          </Typography>
        </CardHeader>
      </Card>
    </a>
  );
};

export const SelectedWork: React.FC = () => {
  return (
    <section>
      <div className="grid gap-4 md:grid-cols-2">
        {README_PROJECTS.map((project) => (
          <ReadmeProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
};
