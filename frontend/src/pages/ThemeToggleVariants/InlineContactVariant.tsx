import * as React from 'react';

import { Typography } from '@/common/Typography';
import { useTheme } from '@/components/theme-provider';
import { EMAIL } from '@/lib/constants';

const ProjectCard: React.FC<{ description: string; title: string }> = ({
  description,
  title,
}) => {
  return (
    <div className="rounded-xl border border-border/70 bg-card/40 p-5">
      <Typography
        as="p"
        className="text-xs font-medium uppercase tracking-[0.16em] text-foreground/48"
      >
        repo project
      </Typography>
      <Typography
        as="h2"
        className="mt-2 text-xl font-medium tracking-tight text-foreground"
      >
        {title}
      </Typography>
      <Typography as="p" className="mt-2 text-sm leading-6 text-foreground/68">
        {description}
      </Typography>
    </div>
  );
};

const InlineThemeToggle: React.FC = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const nextLabel = isDark ? 'light' : 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={`Switch to ${nextLabel} mode`}
      className="link-inline cursor-pointer bg-transparent p-0 text-inherit underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
    >
      Switch to {nextLabel} mode
    </button>
  );
};

export const InlineContactVariant: React.FC = () => {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-8">
        <div className="flex items-center">
          <Typography className="text-2xl font-medium">
            Hey, I&apos;m Safwaan!
          </Typography>
        </div>

        <Typography as="p" className="text-base leading-7 text-foreground/80">
          I&apos;m a Full-Stack Engineer. Here are some of my projects.
        </Typography>

        <div className="grid gap-4 sm:grid-cols-2">
          <ProjectCard
            title="wheresxi"
            description="Invite-only prediction market with fake-credit betting and admin settlement."
          />
          <ProjectCard
            title="personal-website"
            description="Portfolio with first-party analytics for anonymous pageviews and click events."
          />
        </div>

        <Typography as="p" className="text-base leading-7 text-foreground/80">
          I like meeting people who care about building things well. You can
          reach me by{' '}
          <a href={`mailto:${EMAIL}`} className="link-inline">
            email
          </a>
          <span aria-hidden="true" className="mx-2 text-foreground/40">
            ·
          </span>
          <InlineThemeToggle />.
        </Typography>
      </div>
    </main>
  );
};
