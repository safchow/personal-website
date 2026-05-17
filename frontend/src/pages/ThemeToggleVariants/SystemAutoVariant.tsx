import * as React from 'react';

import { Typography } from '@/common/Typography';
import { useTheme } from '@/components/theme-provider';
import { EMAIL } from '@/lib/constants';

export const SystemAutoVariant: React.FC = () => {
  const { setTheme, resolvedTheme } = useTheme();

  React.useEffect(() => {
    setTheme('system');
  }, [setTheme]);

  return (
    <div className="relative flex flex-1 min-h-0 flex-col overflow-hidden">
      {/* Mock homepage layout (lightweight, no real Home import) */}
      <div className="flex w-full flex-1 flex-col justify-center px-4 sm:px-6">
        <div className="flex flex-col gap-8">
          <div className="flex items-center">
            <Typography className="text-2xl font-medium">
              Hey, I&apos;m Safwaan!
            </Typography>
          </div>

          <Typography as="p" className="text-base leading-7 text-foreground/80">
            I&apos;m a Full-Stack Engineer. Here are some of my projects.
          </Typography>

          {/* Mock SelectedWork rows */}
          <ul className="flex flex-col divide-y divide-foreground/10 border-y border-foreground/10">
            {[
              {
                name: 'wheresxi',
                blurb: 'Live market intel for football fans',
              },
              { name: 'portfolio', blurb: 'This site, iterating in public' },
              { name: 'side-quests', blurb: 'Smaller experiments & tools' },
            ].map((p) => (
              <li
                key={p.name}
                className="flex items-baseline justify-between gap-4 py-3"
              >
                <Typography className="text-base font-medium">
                  {p.name}
                </Typography>
                <Typography
                  as="span"
                  className="text-sm text-foreground/60 text-right"
                >
                  {p.blurb}
                </Typography>
              </li>
            ))}
          </ul>

          <Typography as="p" className="text-base leading-7 text-foreground/80">
            I like meeting people who care about building things well. You can
            reach me by{' '}
            <a href={`mailto:${EMAIL}`} className="link-inline">
              email
            </a>
            .
          </Typography>
        </div>
      </div>

      {/* Subtle status indicator — informational only, no toggle */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="pointer-events-none fixed inset-x-0 bottom-3 flex justify-center px-4 sm:bottom-4"
      >
        <Typography
          as="span"
          className="rounded-full border border-foreground/10 bg-background/70 px-3 py-1 text-xs text-foreground/55 backdrop-blur-sm"
        >
          Theme follows your system · currently {resolvedTheme}
        </Typography>
      </div>
    </div>
  );
};

export default SystemAutoVariant;
