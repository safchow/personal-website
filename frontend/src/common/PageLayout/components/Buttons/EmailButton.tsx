import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useTrackedClick } from '@/lib/analytics/useTrackedClick';
import { EMAIL } from '@/lib/constants';

const COPY_RESET_DELAY_MS = 2000;

export const EmailButton: React.FC = () => {
  const [isCopied, setIsCopied] = React.useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), COPY_RESET_DELAY_MS);
    } catch {
      setIsCopied(false);
    }
  };

  const handleClick = useTrackedClick('email', copyEmail);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClick}
          aria-label={isCopied ? 'Copied' : 'Copy email'}
        >
          <FontAwesomeIcon icon={faEnvelope} size="lg" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Copy email</p>
      </TooltipContent>
    </Tooltip>
  );
};
