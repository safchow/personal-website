import { createFileRoute } from '@tanstack/react-router';

import { InlineContactVariant } from '@/pages/ThemeToggleVariants/InlineContactVariant';

export const Route = createFileRoute('/theme-toggle-variants/inline-contact')({
  component: InlineContactVariant,
});
