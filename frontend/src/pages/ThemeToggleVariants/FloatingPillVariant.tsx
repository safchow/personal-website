import { Moon, Sun } from 'lucide-react';
import * as React from 'react';

import { Typography } from '@/common/Typography';
import { useTheme } from '@/components/theme-provider';

const MOCK_PROJECTS = [
  {
    title: 'wheresxi',
    blurb:
      'Invite-only prediction market with fake-credit betting, admin settlement, and insider trading.',
    tag: 'repo project',
  },
  {
    title: 'portfolio',
    blurb:
      'This website. A handcrafted, type-safe React playground for case studies and design experiments.',
    tag: 'design + code',
  },
  {
    title: 'analytics visuals',
    blurb:
      'A collection of small, opinionated charts that prioritize clarity over chartjunk.',
    tag: 'data viz',
  },
];

const FloatingPillToggle: React.FC = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center sm:inset-x-auto sm:bottom-6 sm:right-6 sm:justify-end"
      aria-hidden={false}
    >
      <div
        role="radiogroup"
        aria-label="Color theme"
        className="pointer-events-auto relative flex items-center gap-1 rounded-full border border-black/10 bg-white/60 p-1 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.25)] backdrop-blur-md dark:border-white/10 dark:bg-black/40 dark:shadow-[0_4px_20px_-8px_rgba(0,0,0,0.6)]"
      >
        <span
          className={`absolute top-1 bottom-1 w-9 rounded-full bg-black/5 transition-transform duration-300 ease-out dark:bg-white/10 ${
            isDark ? 'translate-x-9' : 'translate-x-0'
          }`}
          style={{ left: '0.25rem' }}
          aria-hidden="true"
        />
        <button
          type="button"
          role="radio"
          aria-checked={!isDark}
          aria-label="Switch to light theme"
          onClick={() => setTheme('light')}
          className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full text-neutral-700 transition-colors hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:text-neutral-300 dark:hover:text-white"
        >
          <Sun className="h-4 w-4" />
        </button>
        <button
          type="button"
          role="radio"
          aria-checked={isDark}
          aria-label="Switch to dark theme"
          onClick={() => setTheme('dark')}
          className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full text-neutral-700 transition-colors hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:text-neutral-300 dark:hover:text-white"
        >
          <Moon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export const FloatingPillVariant: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full bg-background text-foreground">
      <div className="mx-auto flex max-w-3xl flex-col gap-12 px-6 py-16 pb-32 sm:py-24">
        <header className="flex flex-col gap-3">
          <Typography as="p" className="text-sm tracking-wide text-neutral-500">
            safwaan chowdhury
          </Typography>
          <Typography as="h1" className="text-3xl font-medium sm:text-4xl">
            Engineer and designer building thoughtful software.
          </Typography>
          <Typography
            as="p"
            className="max-w-xl text-base text-neutral-600 dark:text-neutral-400"
          >
            I care about taste, durability, and the small details that make
            tools feel calm. This page is a preview of a floating theme switch
            tucked into the bottom corner — out of the way, but always within
            reach.
          </Typography>
        </header>

        <section className="flex flex-col gap-6">
          <div className="flex items-baseline justify-between">
            <Typography as="h2" className="text-lg font-medium">
              Selected work
            </Typography>
            <Typography as="span" className="text-xs text-neutral-500">
              2024 — 2026
            </Typography>
          </div>

          <ul className="flex flex-col gap-4">
            {MOCK_PROJECTS.map((p) => (
              <li
                key={p.title}
                className="group flex flex-col gap-2 rounded-lg border border-black/5 bg-white/40 p-5 transition-colors hover:bg-white/70 dark:border-white/5 dark:bg-white/[0.02] dark:hover:bg-white/[0.04]"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <Typography as="h3" className="text-base font-medium">
                    {p.title}
                  </Typography>
                  <Typography
                    as="span"
                    className="shrink-0 text-xs uppercase tracking-wide text-neutral-500"
                  >
                    {p.tag}
                  </Typography>
                </div>
                <Typography
                  as="p"
                  className="text-sm text-neutral-600 dark:text-neutral-400"
                >
                  {p.blurb}
                </Typography>
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col gap-3 border-t border-black/5 pt-8 dark:border-white/5">
          <Typography as="p" className="text-sm text-neutral-500">
            Scroll, read, browse — the toggle stays pinned without crowding the
            header. Try focusing it with the keyboard to confirm it's reachable.
          </Typography>
        </section>
      </div>

      <FloatingPillToggle />
    </div>
  );
};

export default FloatingPillVariant;
