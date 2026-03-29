export const CASE_STUDY_MENU_ITEMS: CaseStudyMenuItem[] = [
  {
    id: 'projects',
    gradientClass: 'menu-1-gradient',
    href: '/case-studies/opulus',
    title: 'Syncing Financial Data',
    description:
      'Designed a webhook-driven pipeline that turned Plaid events into reliable transaction syncs, keeping financial data current with background processing and incremental updates.',
  },
  {
    id: 'experience',
    gradientClass: 'menu-2-gradient',
    href: '/case-studies/website',
    title: 'Understanding User Behavior',
    description:
      'Built an anonymous analytics pipeline for tracking pageviews and clicks, making it easier to understand how users moved through the experience.',
  },
  // // todo: add more case studies, below are just placeholders
  {
    id: 'skills',
    gradientClass: 'menu-3-gradient',
    title: 'Engineering Craft',
    description:
      'TypeScript-first architecture, thoughtful UI implementation, and backend systems that stay maintainable over time.',
  },
  {
    id: 'contact',
    gradientClass: 'menu-4-gradient',
    title: 'Case Studies',
    description:
      'A snapshot of how I approach product thinking, technical execution, and the details that make software feel complete.',
  },
];

export interface CaseStudyMenuItem {
  id: string;
  gradientClass: string;
  href?: string;
  title: string;
  description: string;
}
