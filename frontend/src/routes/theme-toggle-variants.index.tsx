import { createFileRoute } from '@tanstack/react-router';

import { ThemeToggleVariantsIndex } from '@/pages/ThemeToggleVariants/ThemeToggleVariantsIndex';

export const Route = createFileRoute('/theme-toggle-variants/')({
  component: ThemeToggleVariantsIndex,
});
