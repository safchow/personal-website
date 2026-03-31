export const CASE_STUDY_MENU_ITEMS: CaseStudyMenuItem[] = [
  {
    id: 'contact',
    gradientClass: 'menu-1-gradient',
    title: 'Case Studies',
    description:
      'A snapshot of how I approach product thinking, technical execution, and the details that make software feel complete.',
  },
  {
    id: 'experience',
    gradientClass: 'menu-2-gradient',
    href: '/case-studies/portfolio',
    title: 'Understanding User Behavior',
    description:
      'Built an anonymous analytics pipeline for tracking pageviews and clicks, making it easier to understand how users moved through the experience.',
  },
  {
    id: 'projects',
    gradientClass: 'menu-3-gradient',
    href: '/case-studies/opulus',
    title: 'Syncing Financial Data',
    description:
      'Designed a webhook-driven pipeline that turned Plaid events into reliable transaction syncs, keeping financial data current with background processing and incremental updates.',
  },
  // todo later
  // {
  //   id: 'skills',
  //   gradientClass: 'menu-3-gradient',
  //   href: '/case-studies/architecture',
  //   title: 'Frontend Architecture',
  //   description:
  //     'Architected frontend code around clear component layers, shared UI primitives, and reusable feature modules that keep interfaces scalable as products grow.',
  // },
];

export interface CaseStudyMenuItem {
  id: string;
  gradientClass: string;
  href?: string;
  title: string;
  description: string;
}
