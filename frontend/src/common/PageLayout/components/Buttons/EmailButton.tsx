import { faCheck, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Tooltip, TooltipContent, TooltipTrigger } from '@stones';
import React from 'react';

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

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={copyEmail}
          aria-label={isCopied ? 'Copied' : 'Copy email'}
        >
          <span className="relative inline-block size-6">
            <FontAwesomeIcon
              icon={faEnvelope}
              className={`absolute inset-0 size-6 transition-opacity duration-200 ease-in-out ${isCopied ? 'opacity-0' : 'opacity-100'}`}
            />
            <FontAwesomeIcon
              icon={faCheck}
              className={`absolute inset-0 size-6 transition-opacity duration-200 ease-in-out ${isCopied ? 'opacity-100' : 'opacity-0'}`}
            />
          </span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Copy email</p>
      </TooltipContent>
    </Tooltip>
  );
};
