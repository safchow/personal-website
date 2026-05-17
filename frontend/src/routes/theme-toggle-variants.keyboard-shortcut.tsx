import { createFileRoute } from '@tanstack/react-router';

import { KeyboardShortcutVariant } from '@/pages/ThemeToggleVariants/KeyboardShortcutVariant';

export const Route = createFileRoute(
  '/theme-toggle-variants/keyboard-shortcut'
)({
  component: KeyboardShortcutVariant,
});
