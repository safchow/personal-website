import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Tooltip, TooltipContent, TooltipTrigger } from '@stones';
import {
  CheckIcon,
  MailIcon,
  MoonIcon,
  StoneIcon,
  SunIcon,
} from 'lucide-react';
import * as React from 'react';

import { Typography } from '@/common/Typography';
import { useTheme } from '@/components/theme-provider';
import { EMAIL, GITHUB_URL, LINKEDIN_URL, RESUME_URL } from '@/lib/constants';

const COPY_RESET_DELAY_MS = 2000;

export const Header: React.FC = () => {
  return (
    <div className="w-full h-fit flex flex-row justify-between">
      <div className="flex flex-row items-center gap-4">
        <StoneIcon className="size-6" />
        <Typography className="text-lg font-normal">
          Safwaan Chowdhury
        </Typography>
      </div>

      <div className="flex flex-row gap-4">
        {/* <Button variant="ghost">
          <Typography className="text-base font-light">About</Typography>
        </Button> */}

        <ResumeButton />
        <EmailButton />
        <GitHubButton />
        <LinkedInButton />
        <ThemeToggleButton />
      </div>
    </div>
  );
};

const ResumeButton: React.FC = () => {
  return (
    <Button asChild variant="ghost" aria-label="Resume">
      <a href={RESUME_URL} target="_blank" rel="noopener noreferrer">
        <Typography className="text-base font-light">Resume</Typography>
      </a>
    </Button>
  );
};

const EmailButton: React.FC = () => {
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
            <MailIcon
              className={`absolute inset-0 size-6 transition-opacity duration-200 ease-in-out ${isCopied ? 'opacity-0' : 'opacity-100'}`}
            />
            <CheckIcon
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

const GitHubButton: React.FC = () => {
  return (
    <Button asChild variant="ghost" size="icon" aria-label="GitHub">
      <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faGithub} className="size-6" />
      </a>
    </Button>
  );
};

const LinkedInButton: React.FC = () => {
  return (
    <Button asChild variant="ghost" size="icon" aria-label="LinkedIn">
      <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faLinkedin} className="size-6" />
      </a>
    </Button>
  );
};

const ThemeToggleButton: React.FC = () => {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () =>
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
    >
      <span className="relative inline-block size-5">
        <SunIcon className="absolute inset-0 size-5 opacity-0 transition-opacity duration-[250ms] ease-in-out dark:opacity-100" />
        <MoonIcon className="absolute inset-0 size-5 opacity-100 transition-opacity duration-[250ms] ease-in-out dark:opacity-0" />
      </span>
    </Button>
  );
};
