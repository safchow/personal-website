import { createFileRoute } from '@tanstack/react-router';

import { SystemAutoVariant } from '@/pages/ThemeToggleVariants/SystemAutoVariant';

export const Route = createFileRoute('/theme-toggle-variants/system-auto')({
  component: SystemAutoVariant,
});
