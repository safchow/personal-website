import * as React from 'react';

import { CaseStudyHero } from '@/common/CaseStudy';
import { Typography } from '@/common/Typography';

export const ArchitectureCaseStudy: React.FC = () => {
  return (
    <article className="space-y-10 pb-10">
      <CaseStudyHero
        eyebrow="Frontend"
        theme="skills"
        title="Architecting Frontend Systems"
      />

      <header className="space-y-5">
        <Typography
          as="p"
          className="text-lg leading-relaxed text-foreground/72"
        >
          A case study in structuring frontend code so the UI stays composable,
          predictable, and easy to extend as a product grows.
        </Typography>
        <Typography as="p" className="text-base leading-8 text-foreground/80">
          Across this site and Opulus, my approach has been consistent: keep the
          component hierarchy clear, separate reusable UI primitives from
          product-specific composition, and organize pages so features can
          evolve without the codebase turning into a flat collection of one-off
          components.
        </Typography>
      </header>

      <section className="space-y-4">
        <Typography as="h2" className="text-2xl font-medium tracking-tight">
          Problem
        </Typography>
        <Typography as="p" className="text-base leading-8 text-foreground/78">
          Frontend code gets hard to maintain when responsibilities blur. Layout
          concerns leak into feature components, design-system primitives become
          mixed with page logic, and reusable patterns get copied just far
          enough to drift apart.
        </Typography>
        <Typography as="p" className="text-base leading-8 text-foreground/78">
          The challenge is not only building individual components well. It is
          creating a hierarchy that makes it obvious where shared structure
          belongs, where domain-specific composition belongs, and how new
          screens should be added without introducing architectural noise.
        </Typography>
      </section>

      <section className="space-y-4">
        <Typography as="h2" className="text-2xl font-medium tracking-tight">
          Approach
        </Typography>
        <Typography as="p" className="text-base leading-8 text-foreground/78">
          I tend to structure frontend code in layers. Base UI primitives live
          in a component system, shared shells and layout pieces live in a
          common layer, and pages compose those pieces with feature-specific
          logic. That keeps the lowest-level API stable while giving the product
          layer room to stay expressive.
        </Typography>
        <Typography as="p" className="text-base leading-8 text-foreground/78">
          This site uses a lightweight version of that pattern with local
          `components/ui` primitives and shared `common` building blocks like
          the case study shell and page content wrapper. In Opulus, the same
          idea is pushed further with a dedicated `@opulus/gems` library for
          reusable UI components and an application layer that composes them
          into product flows like dashboards, sidebars, forms, and data-heavy
          views.
        </Typography>
        <ul className="space-y-3 pt-2 text-foreground/78">
          <li className="flex items-start gap-3 text-base leading-7">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-foreground/45" />
            <span>
              Keep design-system primitives separate from product features
            </span>
          </li>
          <li className="flex items-start gap-3 text-base leading-7">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-foreground/45" />
            <span>Use shared layout shells to standardize page structure</span>
          </li>
          <li className="flex items-start gap-3 text-base leading-7">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-foreground/45" />
            <span>
              Minimize duplication by extracting reusable composition layers
            </span>
          </li>
          <li className="flex items-start gap-3 text-base leading-7">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-foreground/45" />
            <span>
              Let hooks and utility modules own data and orchestration logic
            </span>
          </li>
          <li className="flex items-start gap-3 text-base leading-7">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-foreground/45" />
            <span>
              Compose pages from focused modules instead of monolithic screens
            </span>
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <Typography as="h2" className="text-2xl font-medium tracking-tight">
          Implementation Details
        </Typography>
        <Typography as="p" className="text-base leading-8 text-foreground/78">
          On this site, the architecture is intentionally small but still
          opinionated. Reusable primitives like buttons and tooltips live under
          `components/ui`, while cross-page pieces like case study wrappers,
          typography, and header/footer composition live in `common`. That split
          keeps design-level reuse separate from page-level reuse.
        </Typography>
        <Typography as="p" className="text-base leading-8 text-foreground/78">
          Opulus follows the same philosophy at a larger scale. A shared `@gems`
          package exposes the design-system layer, while the frontend app uses
          common shells like `AppLayout` and domain-specific modules such as the
          dashboard table, charts, and settings navigation. Hooks and API
          clients sit alongside that component hierarchy so data fetching and
          presentation stay modular rather than tightly coupled.
        </Typography>
      </section>

      <section className="space-y-4">
        <Typography as="h2" className="text-2xl font-medium tracking-tight">
          Outcome
        </Typography>
        <Typography as="p" className="text-base leading-8 text-foreground/78">
          The result is a frontend style that scales by composition instead of
          accumulation. New screens can reuse the same primitives, shells, and
          module boundaries, which makes it easier to extend the product without
          rethinking the structure every time.
        </Typography>
        <Typography as="p" className="text-base leading-8 text-foreground/78">
          That matters to me because maintainability in frontend work is rarely
          about any single component. It comes from making the component
          hierarchy feel intentional, so the codebase keeps its shape as more
          product surface area gets added.
        </Typography>
      </section>

      <section className="rounded-2xl border border-border/70 bg-background/60 p-6">
        <Typography
          as="p"
          className="text-xs font-medium uppercase tracking-[0.16em] text-foreground/48"
        >
          Takeaway
        </Typography>
        <Typography
          as="p"
          className="mt-3 text-base leading-8 text-foreground/76"
        >
          My frontend architecture style is less about chasing a single pattern
          and more about preserving clear boundaries: a reusable component
          system, a shared composition layer, and page modules that can stay
          focused on product behavior.
        </Typography>
      </section>
    </article>
  );
};
