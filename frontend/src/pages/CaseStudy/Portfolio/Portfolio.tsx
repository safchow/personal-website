import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';

import { CaseStudyHero, CaseStudyLayout } from '@/common/CaseStudy';
import { Typography } from '@/common/Typography';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/ui/card';
import { useClicks } from '@/hooks/useClicks';
import { usePageviews } from '@/hooks/usePageviews';
import { useTrackEvent } from '@/hooks/useTrackEvent';
import { getSessionId } from '@/lib/analytics/getSessionId';

import { CaseStudyMetricCard, PayloadCard } from './components';

const PERSONAL_PORTFOLIO_REPO_URL = 'https://github.com/safchow/personal-website';
const PORTFOLIO_CASE_STUDY_PATH = '/case-studies/portfolio';
const PORTFOLIO_CASE_STUDY_DEMO_TARGET = 'case-study-demo';

export const PortfolioCaseStudy: React.FC = () => {
  const sessionId = React.useMemo(() => getSessionId(), []);
  const [lastDemoEvent, setLastDemoEvent] = React.useState<{
    path: string;
    sessionId: string;
    target: string;
    timestamp: string;
    type: 'click';
  } | null>(null);
  const [demoError, setDemoError] = React.useState<string | null>(null);

  const {
    data: pageviewStats,
    error: pageviewStatsError,
    isLoading: isLoadingPageviewStats,
  } = usePageviews(PORTFOLIO_CASE_STUDY_PATH);
  const {
    data: clickStats,
    error: clickStatsError,
    isLoading: isLoadingClickStats,
    refetch: refetchClickStats,
  } = useClicks({
    path: PORTFOLIO_CASE_STUDY_PATH,
    target: PORTFOLIO_CASE_STUDY_DEMO_TARGET,
  });
  const { isPending: isEmittingDemoEvent, mutateAsync: emitDemoEvent } =
    useTrackEvent();

  const handleEmitDemoEvent = async () => {
    setDemoError(null);

    const timestamp = new Date().toISOString();

    try {
      await emitDemoEvent({
        type: 'click',
        target: PORTFOLIO_CASE_STUDY_DEMO_TARGET,
        path: PORTFOLIO_CASE_STUDY_PATH,
      });

      setLastDemoEvent({
        path: PORTFOLIO_CASE_STUDY_PATH,
        sessionId,
        target: PORTFOLIO_CASE_STUDY_DEMO_TARGET,
        timestamp,
        type: 'click',
      });

      void refetchClickStats();
    } catch {
      setDemoError(
        'The event could not be written. Check that the backend is running.'
      );
    }
  };

  const formatTimestamp = (value: string) =>
    new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
    }).format(new Date(value));

  const payloadPreview = lastDemoEvent ?? {
    type: 'click' as const,
    target: PORTFOLIO_CASE_STUDY_DEMO_TARGET,
    path: PORTFOLIO_CASE_STUDY_PATH,
    sessionId,
    timestamp: 'waiting-for-event',
  };

  const payloadRows = [
    { label: 'type', value: payloadPreview.type },
    { label: 'target', value: payloadPreview.target },
    { label: 'path', value: payloadPreview.path },
    { label: 'session', value: payloadPreview.sessionId },
    {
      label: 'timestamp',
      value:
        payloadPreview.timestamp === 'waiting-for-event'
          ? payloadPreview.timestamp
          : formatTimestamp(payloadPreview.timestamp),
    },
  ];

  return (
    <CaseStudyLayout>
      <CaseStudyHero
        gradientClass="menu-2-gradient"
        eyebrow="Portfolio"
        title="Understanding User Behavior"
      />

      <header className="space-y-5">
        <Typography
          as="p"
          className="text-lg leading-relaxed text-foreground/72"
        >
          A case study in using lightweight eventing to understand how visitors
          move through this portfolio.
        </Typography>
        <Typography as="p" className="text-base leading-8 text-foreground/80">
          The goal was not to build a heavy analytics product. It was to create
          a simple event pipeline that could answer practical questions about
          the experience, like which pages were being viewed, which actions were
          being clicked, and whether the overall navigation flow made sense,
          without adding friction to the interface.
        </Typography>

        <div className="flex flex-col gap-4 pt-1 sm:flex-row">
          <CaseStudyMetricCard
            className="flex-1"
            helper="Unique anonymous sessions that have visited this page"
            label="Anonymous sessions"
            value={
              pageviewStatsError
                ? 'Unavailable'
                : isLoadingPageviewStats
                  ? '...'
                  : String(pageviewStats?.uniqueSessions ?? 0)
            }
          />
          <CaseStudyMetricCard
            className="flex-1"
            helper="Total pageview events recorded for this route"
            label="Pageviews"
            value={
              pageviewStatsError
                ? 'Unavailable'
                : isLoadingPageviewStats
                  ? '...'
                  : String(pageviewStats?.pageviews ?? 0)
            }
          />
        </div>
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
          keeps the data useful for understanding behavior without trying to
          turn the system into identity-based tracking.
        </Typography>
      </section>

      <section className="space-y-4">
        <Typography as="h2" className="text-2xl font-medium tracking-tight">
          Try the Pipeline
        </Typography>
        <Typography as="p" className="text-base leading-8 text-foreground/78">
          To make the case study more tangible, this page includes a small live
          interaction. The button below emits a real click event for this route,
          then refreshes the aggregate stats so the eventing system can be seen
          in action.
        </Typography>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="secondary"
            onClick={() => {
              void handleEmitDemoEvent();
            }}
            disabled={isEmittingDemoEvent}
          >
            Emit demo event
          </Button>
        </div>

        {clickStatsError ? (
          <Typography as="p" className="text-sm text-foreground/56">
            Live stats are currently unavailable, but the interactive payload is
            still shown below when the backend is available.
          </Typography>
        ) : null}

        <div className="grid gap-4">
          <PayloadCard
            demoError={demoError}
            demoEventsValue={
              clickStatsError ? 'Unavailable' : String(clickStats?.count ?? 0)
            }
            isLoading={isLoadingClickStats}
            rows={payloadRows}
          />
        </div>
      </section>

      <section className="space-y-4">
        <Typography as="h2" className="text-2xl font-medium tracking-tight">
          Outcome
        </Typography>
        <Typography as="p" className="text-base leading-8 text-foreground/78">
          The result is a small but practical analytics layer that makes this
          portfolio more measurable. It surfaces which paths are being visited,
          which calls to action draw attention, and how people move through the
          experience without requiring a large external analytics setup.
        </Typography>
        <Typography as="p" className="text-base leading-8 text-foreground/78">
          I like this kind of work because it connects product questions to
          implementation details. The eventing itself is simple, but its value
          comes from giving the project a tighter feedback loop.
        </Typography>
      </section>

      <Card className="bg-background/60 shadow-none">
        <CardHeader className="p-6">
          <CardDescription className="text-xs font-medium uppercase tracking-[0.16em] text-foreground/48">
            Takeaway
          </CardDescription>
        </CardHeader>
        <CardContent className="px-6 pb-6 pt-0">
          <Typography as="p" className="text-base leading-8 text-foreground/76">
            The interesting part of this case study was not the volume of data.
            It was choosing the smallest eventing system that still made the
            portfolio easier to evaluate, iterate on, and understand from a
            product perspective.
          </Typography>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Typography as="p" className="text-base leading-8 text-foreground/68">
          If you&apos;re interested in how the implementation comes together, you
          can explore the repository below.
        </Typography>
        <div>
          <Button asChild variant="secondary">
            <a
              href={PERSONAL_PORTFOLIO_REPO_URL}
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faGithub} size="lg" />
              View repository
            </a>
          </Button>
        </div>
      </div>
    </CaseStudyLayout>
  );
};
