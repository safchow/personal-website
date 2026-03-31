import * as React from 'react';

import { Typography } from '@/common/Typography';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/ui/card';

interface PayloadRowData {
  label: string;
  value: string;
}

interface PayloadCardProps {
  demoEventsValue: string;
  demoError: string | null;
  isLoading: boolean;
  rows: PayloadRowData[];
}

export const PayloadCard: React.FC<PayloadCardProps> = ({
  demoEventsValue,
  demoError,
  isLoading,
  rows,
}) => {
  return (
    <Card className="min-w-0 bg-background/60 shadow-none">
      <CardHeader className="p-4 sm:p-5">
        <CardDescription className="text-xs font-medium uppercase tracking-[0.16em] text-foreground/48">
          Last emitted payload
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 pb-4 pt-0 sm:px-5 sm:pb-5">
        <div className="space-y-3 rounded-xl bg-foreground/[0.04] p-4">
          {rows.map((row) => (
            <PayloadRow key={row.label} label={row.label} value={row.value} />
          ))}
        </div>

        {demoError ? (
          <Typography as="p" className="mt-3 text-sm text-destructive/80">
            {demoError}
          </Typography>
        ) : (
          <Typography as="p" className="mt-3 text-sm text-foreground/60">
            The event uses this page&apos;s anonymous session ID and the same
            analytics pipeline as the rest of the site.
          </Typography>
        )}

        <Typography as="p" className="mt-3 text-sm text-foreground/60">
          Demo events recorded:{' '}
          <span className="font-medium text-foreground/78">
            {isLoading ? '...' : demoEventsValue}
          </span>
        </Typography>
      </CardContent>
    </Card>
  );
};

interface PayloadRowProps {
  label: string;
  value: string;
}

const PayloadRow: React.FC<PayloadRowProps> = ({ label, value }) => {
  return (
    <div className="grid gap-1 sm:grid-cols-[96px_minmax(0,1fr)] sm:gap-3">
      <Typography
        as="p"
        className="text-xs font-medium uppercase tracking-[0.12em] leading-6 text-foreground/45"
      >
        {label}
      </Typography>
      <Typography
        as="p"
        className="min-w-0 break-all font-mono text-xs leading-6 text-foreground/78"
      >
        {value}
      </Typography>
    </div>
  );
};
