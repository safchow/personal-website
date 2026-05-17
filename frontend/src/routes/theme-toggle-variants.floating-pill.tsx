import { createFileRoute } from '@tanstack/react-router';

import { FloatingPillVariant } from '@/pages/ThemeToggleVariants/FloatingPillVariant';

export const Route = createFileRoute('/theme-toggle-variants/floating-pill')({
  component: FloatingPillVariant,
});
