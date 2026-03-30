import * as React from 'react';

import { CaseStudyHero, CaseStudyLayout } from '@/common/CaseStudy';
import { Typography } from '@/common/Typography';

export const WebsiteCaseStudy: React.FC = () => {
  return (
    <CaseStudyLayout>
      <CaseStudyHero
        gradientClass="menu-2-gradient"
        eyebrow="Website"
        title="Understanding User Behavior"
      />

      <header className="space-y-5">
        <Typography
          as="p"
          className="text-lg leading-relaxed text-foreground/72"
        >
          A case study in using lightweight eventing to understand how visitors
          move through this site.
        </Typography>
        <Typography as="p" className="text-base leading-8 text-foreground/80">
          The goal was not to build a heavy analytics product. It was to create a
          simple event pipeline that could answer practical questions about the
          experience, like which pages were being viewed, which actions were
          being clicked, and whether the overall navigation flow made sense,
          without adding friction to the interface.
        </Typography>
      </header>

      <section className="space-y-4">
        <Typography as="h2" className="text-2xl font-medium tracking-tight">
          Problem
        </Typography>
        <Typography as="p" className="text-base leading-8 text-foreground/78">
          A portfolio site only works if it actually communicates what matters.
          That makes user behavior useful feedback: pageviews show what people
          reach, click events show what they engage with, and session-level
          patterns help reveal whether the site is guiding attention the way it
          is intended to.
        </Typography>
        <Typography as="p" className="text-base leading-8 text-foreground/78">
          The challenge was to capture that signal with minimal complexity and a
          low privacy footprint, instead of dropping in a large analytics layer
          that would feel out of proportion to the project.
        </Typography>
      </section>

      <section className="space-y-4">
        <Typography as="h2" className="text-2xl font-medium tracking-tight">
          Approach
        </Typography>
        <Typography as="p" className="text-base leading-8 text-foreground/78">
          I implemented a small eventing flow that tracks two core event types:
          pageviews and clicks. Pageviews are recorded on navigation, while
          button and link interactions use a tracked click helper that lets the
          user action happen immediately and sends analytics in the background.
        </Typography>
        <Typography as="p" className="text-base leading-8 text-foreground/78">
          Each event is tied to an anonymous session ID and enriched with light
          device metadata like viewport size, referrer, and user agent. That
          keeps the data useful for understanding behavior without trying to turn
          the system into identity-based tracking.
        </Typography>
        <ul className="space-y-3 pt-2 text-foreground/78">
          <li className="flex items-start gap-3 text-base leading-7">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-foreground/45" />
            <span>Track pageviews whenever the router location changes</span>
          </li>
          <li className="flex items-start gap-3 text-base leading-7">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-foreground/45" />
            <span>Record clicks without blocking the user interaction</span>
          </li>
          <li className="flex items-start gap-3 text-base leading-7">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-foreground/45" />
            <span>Persist an anonymous session ID in session storage</span>
          </li>
          <li className="flex items-start gap-3 text-base leading-7">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-foreground/45" />
            <span>
              Attach lightweight metadata that gives each event useful context
            </span>
          </li>
          <li className="flex items-start gap-3 text-base leading-7">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-foreground/45" />
            <span>Store events through a validated backend API endpoint</span>
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <Typography as="h2" className="text-2xl font-medium tracking-tight">
          Implementation Details
        </Typography>
        <Typography as="p" className="text-base leading-8 text-foreground/78">
          On the frontend, the pageview tracking sits at the router level so it
          can observe navigation directly. The implementation also guards against
          duplicate events by remembering the last tracked path, which helps keep
          the signal clean during client-side transitions.
        </Typography>
        <Typography as="p" className="text-base leading-8 text-foreground/78">
          On the backend, events are validated with a small schema and written to
          the database through a dedicated endpoint. There is also a protected
          listing route for reviewing captured events, which makes the pipeline
          more useful as an internal feedback tool instead of just a fire-and-
          forget write.
        </Typography>
      </section>

      <section className="space-y-4">
        <Typography as="h2" className="text-2xl font-medium tracking-tight">
          Outcome
        </Typography>
        <Typography as="p" className="text-base leading-8 text-foreground/78">
          The result is a small but practical analytics layer that makes this
          site more measurable. It surfaces which paths are being visited, which
          calls to action draw attention, and how people move through the
          experience without requiring a large external analytics setup.
        </Typography>
        <Typography as="p" className="text-base leading-8 text-foreground/78">
          I like this kind of work because it connects product questions to
          implementation details. The eventing itself is simple, but its value
          comes from giving the project a tighter feedback loop.
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
          The interesting part of this case study was not the volume of data. It
          was choosing the smallest eventing system that still made the site
          easier to evaluate, iterate on, and understand from a product
          perspective.
        </Typography>
      </section>
    </CaseStudyLayout>
  );
};
