import type { CaseStudyThemeId } from '@/common/CaseStudy/caseStudyThemes';

export const CASE_STUDY_MENU_ITEMS: CaseStudyMenuItem[] = [
  {
    id: 'experience',
    href: '/case-studies/portfolio',
    listLabel: 'Portfolio analytics and eventing',
    title: 'Understanding User Behavior',
    description:
      'Built an anonymous analytics pipeline for tracking pageviews and clicks, making it easier to understand how users moved through the experience.',
  },
  {
    id: 'projects',
    href: '/case-studies/opulus',
    listLabel: 'Plaid-driven transaction syncs',
    title: 'Syncing Financial Data',
    description:
      'Designed a webhook-driven pipeline that turned Plaid events into reliable transaction syncs, keeping financial data current with background processing and incremental updates.',
  },
  {
    id: 'skills',
    href: '/case-studies/architecture',
    listLabel: 'Reusable frontend systems',
    title: 'Frontend Architecture',
    description:
      'Architected frontend code around clear component layers, shared UI primitives, and reusable feature modules that keep interfaces scalable as products grow.',
  },
];

export interface CaseStudyMenuItem {
  id: CaseStudyThemeId;
  href?: string;
  listLabel: string;
  title: string;
  description: string;
}
