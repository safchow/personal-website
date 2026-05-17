import { Moon, Sun } from 'lucide-react';
import * as React from 'react';

import { Typography } from '@/common/Typography';
import { useTheme } from '@/components/theme-provider';

const TOAST_DURATION_MS = 1400;
const HINT_FADE_DELAY_MS = 4000;

const Kbd: React.FC<React.PropsWithChildren> = ({ children }) => (
  <kbd className="inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-md border border-border/70 bg-background/80 px-1.5 font-mono text-[11px] font-medium text-foreground/70 shadow-[inset_0_-1px_0_0_rgba(0,0,0,0.06)]">
    {children}
  </kbd>
);

export const KeyboardShortcutVariant: React.FC = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [toastVisible, setToastVisible] = React.useState(false);
  const [hasInteracted, setHasInteracted] = React.useState(false);
  const [hintFaded, setHintFaded] = React.useState(false);
  const toastTimerRef = React.useRef<number | null>(null);

  const toggleTheme = React.useCallback(() => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    setHasInteracted(true);
    setToastVisible(true);
    if (toastTimerRef.current !== null) {
      window.clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = window.setTimeout(() => {
      setToastVisible(false);
      toastTimerRef.current = null;
    }, TOAST_DURATION_MS);
  }, [resolvedTheme, setTheme]);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target) {
        const tag = target.tagName;
        if (
          tag === 'INPUT' ||
          tag === 'TEXTAREA' ||
          tag === 'SELECT' ||
          target.isContentEditable
        ) {
          return;
        }
      }

      const isCmdPeriod = (event.metaKey || event.ctrlKey) && event.key === '.';
      const isPlainT =
        event.key.toLowerCase() === 't' &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.altKey;

      if (isCmdPeriod || isPlainT) {
        event.preventDefault();
        toggleTheme();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleTheme]);

  React.useEffect(() => {
    if (!hasInteracted) return;
    const id = window.setTimeout(() => setHintFaded(true), HINT_FADE_DELAY_MS);
    return () => window.clearTimeout(id);
  }, [hasInteracted]);

  React.useEffect(() => {
    return () => {
      if (toastTimerRef.current !== null) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="relative min-h-[calc(100vh-6rem)] w-full">
      <main className="mx-auto w-full max-w-5xl space-y-12 px-4 py-12 sm:px-6 lg:px-8">
        <header className="max-w-3xl space-y-3">
          <Typography
            as="p"
            className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/48"
          >
            Theme toggle variant
          </Typography>
          <Typography
            as="h1"
            className="text-3xl font-medium tracking-tight text-foreground sm:text-5xl"
          >
            Keyboard shortcut, hidden in plain sight
          </Typography>
          <Typography
            as="p"
            className="text-base leading-7 text-foreground/68 sm:text-lg sm:leading-8"
          >
            No persistent button in the chrome. Press <Kbd>T</Kbd> or{' '}
            <Kbd>⌘</Kbd>
            <Kbd>.</Kbd> from anywhere on the page to flip the theme. A faint
            hint sits at the bottom edge for first-time visitors.
          </Typography>
        </header>

        <section className="space-y-6">
          <Typography
            as="h2"
            className="text-xl font-medium tracking-tight text-foreground sm:text-2xl"
          >
            Selected work
          </Typography>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: 'wheresxi',
                blurb:
                  'Invite-only prediction market with fake-credit betting and admin settlement.',
              },
              {
                title: 'personal-website / analytics',
                blurb:
                  'First-party pageview, click, and feedback analytics for this site.',
              },
              {
                title: 'theme-toggle-variants',
                blurb:
                  'Four lightweight pages exploring where a theme switch should actually live.',
              },
              {
                title: 'project-variants',
                blurb:
                  'Comparing repo-first, screenshot-led, and minimal layouts side by side.',
              },
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-border/70 bg-card/40 p-5"
              >
                <Typography
                  as="h3"
                  className="text-base font-medium tracking-tight text-foreground"
                >
                  {item.title}
                </Typography>
                <Typography
                  as="p"
                  className="mt-2 text-sm leading-6 text-foreground/68"
                >
                  {item.blurb}
                </Typography>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-dashed border-border/70 bg-background/40 p-6">
          <Typography as="p" className="text-sm leading-6 text-foreground/58">
            Current theme:{' '}
            <span className="font-medium text-foreground/80">
              {resolvedTheme}
            </span>
            . Try the shortcut from anywhere — focus does not need to be on a
            button.
          </Typography>
        </section>
      </main>

      <div
        aria-live="polite"
        aria-atomic="true"
        className="pointer-events-none sr-only"
      >
        {toastVisible ? `Theme set to ${resolvedTheme}` : ''}
      </div>

      <div
        className={`pointer-events-none fixed inset-x-0 bottom-4 z-40 hidden justify-center transition-opacity duration-700 sm:flex ${
          hintFaded ? 'opacity-0' : 'opacity-60 hover:opacity-100'
        }`}
      >
        <div className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3 py-1.5 text-[11px] text-foreground/60 shadow-sm backdrop-blur">
          <span>Press</span>
          <Kbd>T</Kbd>
          <span>or</span>
          <Kbd>⌘</Kbd>
          <Kbd>.</Kbd>
          <span>to toggle theme</span>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-4 z-40 flex justify-center sm:hidden">
        <button
          type="button"
          onClick={toggleTheme}
          className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-3 py-1.5 text-xs text-foreground/70 shadow-sm backdrop-blur"
        >
          {resolvedTheme === 'dark' ? (
            <Sun className="size-3.5" aria-hidden="true" />
          ) : (
            <Moon className="size-3.5" aria-hidden="true" />
          )}
          <span>tap to switch theme</span>
        </button>
      </div>

      <div
        className={`pointer-events-none fixed bottom-16 left-1/2 z-50 -translate-x-1/2 transition-all duration-300 ${
          toastVisible ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'
        }`}
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/90 px-3 py-1.5 text-xs text-foreground/80 shadow-md backdrop-blur">
          {resolvedTheme === 'dark' ? (
            <Moon className="size-3.5" aria-hidden="true" />
          ) : (
            <Sun className="size-3.5" aria-hidden="true" />
          )}
          <span>{resolvedTheme === 'dark' ? 'Dark' : 'Light'} theme</span>
        </div>
      </div>
    </div>
  );
};

export default KeyboardShortcutVariant;
