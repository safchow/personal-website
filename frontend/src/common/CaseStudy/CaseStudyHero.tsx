import * as React from 'react';

import { Typography } from '@/common/Typography';
import { cn } from '@/lib/utils';

interface CaseStudyHeroProps {
  gradientClass: string;
  eyebrow: string;
  title: string;
}

export const CaseStudyHero: React.FC<CaseStudyHeroProps> = ({
  gradientClass,
  eyebrow,
  title,
}) => {
  return (
    <section
      className={cn(
        'relative flex min-h-64 items-center justify-center overflow-hidden rounded-[2rem] p-8 text-center',
        gradientClass
      )}
    >
      <div className="absolute inset-0 expanding-menu-vignette" />
      <div className="relative z-10 mx-auto max-w-2xl space-y-4">
        <Typography
          as="p"
          className="text-[hsl(var(--menu-copy-description))] text-xs font-medium uppercase tracking-[0.2em] sm:text-sm"
        >
          {eyebrow}
        </Typography>
        <Typography
          as="h1"
          className="text-[hsl(var(--menu-copy-title))] text-3xl font-medium tracking-tight sm:text-4xl"
        >
          {title}
        </Typography>
      </div>
    </section>
  );
};
