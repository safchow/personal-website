import { createFileRoute } from '@tanstack/react-router';

import { ArchitectureCaseStudy } from '@/pages/CaseStudy/caseStudies/Architecture';

export const Route = createFileRoute('/case-studies/architecture')({
  component: ArchitectureCaseStudy,
});
