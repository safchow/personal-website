import * as React from 'react';

import { CaseStudyHero } from '@/common/CaseStudy';
import { Typography } from '@/common/Typography';

export const OpulusCaseStudy: React.FC = () => {
  return (
    <article className="space-y-10 pb-10">
      <CaseStudyHero
        gradientClass="menu-3-gradient"
        eyebrow="Opulus"
        title="Syncing Financial Data"
      />

      <header className="space-y-5">
        <Typography
          as="p"
          className="text-lg leading-relaxed text-foreground/72"
        >
          A case study in turning Plaid webhook events into a reliable
          transaction sync pipeline.
        </Typography>
        <Typography as="p" className="text-base leading-8 text-foreground/80">
          This work focused on one narrow but important part of the product:
          making sure transaction data stayed current without turning webhook
          handling into a brittle, synchronous bottleneck. The solution centered
          on a pipeline that acknowledged provider events quickly, handed off
          work to background processing, and treated transaction syncing as a
          repeatable system rather than a single API call.
        </Typography>
      </header>

      <section className="space-y-4">
        <Typography as="h2" className="text-2xl font-medium tracking-tight">
          Problem
        </Typography>
        <Typography as="p" className="text-base leading-8 text-foreground/78">
          Transaction data changes constantly, but the system receiving those
          updates cannot assume a single webhook means a single record change.
          New transactions arrive, existing ones are modified, older ones can be
          removed, and any sync flow has to account for all of that without
          blocking the provider callback.
        </Typography>
        <Typography as="p" className="text-base leading-8 text-foreground/78">
          The challenge was to design something dependable enough for financial
          data while keeping the implementation clean and observable.
        </Typography>
      </section>

      <section className="space-y-4">
        <Typography as="h2" className="text-2xl font-medium tracking-tight">
          Approach
        </Typography>
        <Typography as="p" className="text-base leading-8 text-foreground/78">
          I structured the flow as a webhook-driven pipeline. Incoming Plaid
          events were acknowledged immediately, then handed off to background
          processing where the application could safely do the heavier sync
          work.
        </Typography>
        <Typography as="p" className="text-base leading-8 text-foreground/78">
          From there, the transaction sync step treated Plaid as an incremental
          source of truth, pulling added, modified, and removed transactions and
          reconciling them into the product database using cursor-based updates.
        </Typography>
        <ul className="space-y-3 pt-2 text-foreground/78">
          <li className="flex items-start gap-3 text-base leading-7">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-foreground/45" />
            <span>Acknowledge incoming webhook events quickly</span>
          </li>
          <li className="flex items-start gap-3 text-base leading-7">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-foreground/45" />
            <span>Queue work for asynchronous processing and retries</span>
          </li>
          <li className="flex items-start gap-3 text-base leading-7">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-foreground/45" />
            <span>
              Sync changes incrementally instead of re-fetching everything
            </span>
          </li>
          <li className="flex items-start gap-3 text-base leading-7">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-foreground/45" />
            <span>
              Normalize provider payloads before writing application data
            </span>
          </li>
          <li className="flex items-start gap-3 text-base leading-7">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-foreground/45" />
            <span>
              Advance cursors only after a successful reconciliation pass
            </span>
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <Typography as="h2" className="text-2xl font-medium tracking-tight">
          Implementation Details
        </Typography>
        <Typography as="p" className="text-base leading-8 text-foreground/78">
          The most important engineering decision was separating event receipt
          from event processing. That kept the webhook surface fast and stable
          while allowing the sync layer to handle pagination, reconciliation,
          and failure recovery without coupling those concerns to request
          latency.
        </Typography>
        <Typography as="p" className="text-base leading-8 text-foreground/78">
          On the persistence side, the sync logic grouped writes into a single
          transaction so the system could create, update, delete, and advance
          cursors together. That made the behavior easier to reason about and
          reduced the risk of partial updates.
        </Typography>
      </section>

      <section className="space-y-4">
        <Typography as="h2" className="text-2xl font-medium tracking-tight">
          Outcome
        </Typography>
        <Typography as="p" className="text-base leading-8 text-foreground/78">
          The result was a cleaner operational model for financial syncing:
          provider events triggered work, background workers performed
          reconciliation, and transaction data stayed aligned through
          incremental updates instead of fragile one-off handlers.
        </Typography>
        <Typography as="p" className="text-base leading-8 text-foreground/78">
          It is the kind of systems work I enjoy most, where the product outcome
          depends on backend behavior feeling predictable under real-world
          change.
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
          The interesting part of this project was not just integrating Plaid.
          It was designing the workflow around that integration so transaction
          updates could be processed reliably, incrementally, and with clear
          operational boundaries.
        </Typography>
      </section>
    </article>
  );
};
