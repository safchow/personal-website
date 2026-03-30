import { createFileRoute } from '@tanstack/react-router';

import { WebsiteCaseStudy } from '@/pages/CaseStudy/Website';

export const Route = createFileRoute('/case-studies/website')({
  component: WebsiteCaseStudy,
});
