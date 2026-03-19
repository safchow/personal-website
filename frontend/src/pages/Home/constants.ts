export const CASE_STUDY_MENU_ITEMS: CaseStudyMenuItem[] = [
  {
    id: 'projects',
    gradientClass: 'expanding-menu-projects', // todo: rename gradient classes
    title: 'Syncing Financial Data',
    description:
      'Designed a webhook-driven pipeline that turned Plaid events into reliable transaction syncs, keeping financial data current with background processing and incremental updates.',
  },
  {
    id: 'experience',
    gradientClass: 'expanding-menu-experience',
    title: 'Understanding User Behavior',
    description:
      'Built an anonymous analytics pipeline for tracking pageviews and clicks, making it easier to understand how users moved through the experience.',
  },
  // // todo: add more case studies, below are just placeholders
  {
    id: 'skills',
    gradientClass: 'expanding-menu-skills',
    title: 'Engineering Craft',
    description:
      'TypeScript-first architecture, thoughtful UI implementation, and backend systems that stay maintainable over time.',
  },
  {
    id: 'contact',
    gradientClass: 'expanding-menu-contact',
    title: 'Case Studies',
    description:
      'A snapshot of how I approach product thinking, technical execution, and the details that make software feel complete.',
  },
];

export interface CaseStudyMenuItem {
  id: string;
  gradientClass: string;
  title: string;
  description: string;
}
