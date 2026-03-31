import * as React from 'react';

import { Typography } from '@/common/Typography';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/ui/card';
import { cn } from '@/lib/utils';

interface CaseStudyMetricCardProps {
  className?: string;
  helper: string;
  label: string;
  value: string;
}

export const CaseStudyMetricCard: React.FC<CaseStudyMetricCardProps> = ({
  className,
  helper,
  label,
  value,
}) => {
  return (
    <Card className={cn('min-w-0 bg-background/60 shadow-none', className)}>
      <CardHeader className="p-4 sm:p-5">
        <CardDescription className="text-xs font-medium uppercase tracking-[0.16em] text-foreground/48">
          {label}
        </CardDescription>
        <CardTitle className="mt-3 text-2xl font-medium tracking-tight sm:text-3xl">
          {value}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4 pt-0 sm:px-5 sm:pb-5">
        <Typography as="p" className="text-sm leading-7 text-foreground/60">
          {helper}
        </Typography>
      </CardContent>
    </Card>
  );
};
