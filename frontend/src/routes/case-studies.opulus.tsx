import { createFileRoute } from '@tanstack/react-router';

import { OpulusCaseStudy } from '@/pages/CaseStudy/caseStudies/Opulus';

export const Route = createFileRoute('/case-studies/opulus')({
  component: OpulusCaseStudy,
});
