import * as React from 'react';

import { Typography } from '@/common/Typography';
import { cn } from '@/lib/utils';

import {
  ACTIVE_CASE_STUDY_SURFACE_CLASS,
  CASE_STUDY_SURFACE_RADIUS_CLASS,
  CASE_STUDY_THEME_CLASSES,
  type CaseStudyThemeId,
} from './caseStudyThemes';

interface CaseStudyHeroProps {
  eyebrow: string;
  theme: CaseStudyThemeId;
  title: string;
}

export const CaseStudyHero: React.FC<CaseStudyHeroProps> = ({
  eyebrow,
  theme,
  title,
}) => {
  const themeClasses = CASE_STUDY_THEME_CLASSES[theme];

  return (
    <section
      className={cn(
        'relative flex min-h-64 items-center justify-center overflow-hidden border p-8 text-center',
        CASE_STUDY_SURFACE_RADIUS_CLASS,
        ACTIVE_CASE_STUDY_SURFACE_CLASS,
        themeClasses.menuActiveSurface
      )}
    >
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
