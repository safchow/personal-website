export const ACTIVE_CASE_STUDY_SURFACE_CLASS =
  'border-border/80 bg-card shadow-sm dark:border-white/18 dark:shadow-[0_10px_30px_rgba(0,0,0,0.24)]';

export const CASE_STUDY_SURFACE_RADIUS_CLASS = 'rounded-xl';

export const CASE_STUDY_THEME_CLASSES: Record<
  CaseStudyThemeId,
  CaseStudyThemeClasses
> = {
  experience: {
    menuActiveSurface:
      'dark:border-[hsl(var(--menu-red-accent))]/40 dark:bg-[hsl(var(--menu-red))]/85',
  },
  projects: {
    menuActiveSurface:
      'dark:border-[hsl(var(--menu-blue-accent))]/40 dark:bg-[hsl(var(--menu-blue))]/85',
  },
  skills: {
    menuActiveSurface:
      'dark:border-[hsl(var(--menu-green-accent))]/40 dark:bg-[hsl(var(--menu-green))]/85',
  },
};

interface CaseStudyThemeClasses {
  menuActiveSurface: string;
}

export type CaseStudyThemeId = 'experience' | 'projects' | 'skills';
