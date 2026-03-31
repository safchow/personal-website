import { createFileRoute } from '@tanstack/react-router';

import { PortfolioCaseStudy } from '@/pages/CaseStudy/Portfolio/Portfolio';

export const Route = createFileRoute('/case-studies/portfolio')({
  component: PortfolioCaseStudy,
});
