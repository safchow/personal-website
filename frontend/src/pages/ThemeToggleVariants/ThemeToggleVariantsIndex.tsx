import { Link } from '@tanstack/react-router';
import * as React from 'react';

import { Typography } from '@/common/Typography';

const VARIANTS = [
  {
    href: '/theme-toggle-variants/floating-pill',
    title: 'Floating pill',
    description:
      'Subtle bottom-anchored segmented control. Always reachable, never in the header.',
  },
  {
    href: '/theme-toggle-variants/inline-contact',
    title: 'Inline contact line',
    description:
      'Text-style toggle that sits inside the contact paragraph. No chrome at all.',
  },
  {
    href: '/theme-toggle-variants/keyboard-shortcut',
    title: 'Keyboard shortcut',
    description:
      'Press T (or ⌘.) to toggle. A faint hint at the bottom; tap fallback on mobile.',
  },
  {
    href: '/theme-toggle-variants/system-auto',
    title: 'System auto',
    description:
      'No manual toggle. Follows OS preference and shows a small live status line.',
  },
] as const;

export const ThemeToggleVariantsIndex: React.FC = () => {
  return (
    <main className="mx-auto w-full max-w-4xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <header className="max-w-3xl space-y-3">
        <Typography
          as="p"
          className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/48"
        >
          Theme toggle variants
        </Typography>
        <Typography
          as="h1"
          className="text-3xl font-medium tracking-tight text-foreground sm:text-5xl"
        >
          Alternatives to the top-right toggle.
        </Typography>
        <Typography
          as="p"
          className="text-base leading-7 text-foreground/68 sm:text-lg sm:leading-8"
        >
          Each page is a self-contained mock so the placement can be evaluated
          in context.
        </Typography>
      </header>

      <section className="grid gap-3 sm:grid-cols-2">
        {VARIANTS.map((variant) => (
          <Link
            key={variant.href}
            to={variant.href}
            className="rounded-2xl border border-border/70 bg-background/70 p-5 transition-colors hover:border-foreground/24 hover:bg-foreground/[0.035]"
          >
            <Typography as="h2" className="text-xl font-medium tracking-tight">
              {variant.title}
            </Typography>
            <Typography
              as="p"
              className="mt-3 text-sm leading-6 text-foreground/64"
            >
              {variant.description}
            </Typography>
          </Link>
        ))}
      </section>
    </main>
  );
};
