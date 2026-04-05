import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faBars, faFileLines } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/ui/drawer';
import { useTrackedClick } from '@/lib/analytics/useTrackedClick';
import { GITHUB_URL, LINKEDIN_URL, RESUME_URL } from '@/lib/constants';

export const MobileMenuDrawer: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  const closeDrawer = () => setOpen(false);

  const handleResumeClick = useTrackedClick('resume', () => {
    window.open(RESUME_URL, '_blank', 'noopener,noreferrer');
    closeDrawer();
  });

  const handleGitHubClick = useTrackedClick('github', () => {
    window.open(GITHUB_URL, '_blank', 'noopener,noreferrer');
    closeDrawer();
  });

  const handleLinkedInClick = useTrackedClick('linkedin', () => {
    window.open(LINKEDIN_URL, '_blank', 'noopener,noreferrer');
    closeDrawer();
  });

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open navigation menu">
          <FontAwesomeIcon icon={faBars} size="lg" />
        </Button>
      </DrawerTrigger>

      <DrawerContent className="mx-auto max-w-xl rounded-t-[1.5rem]">
        <DrawerHeader className="px-6 pb-2 text-left">
          <DrawerTitle>Links</DrawerTitle>
          <DrawerDescription>
            Quick ways to get in touch and browse my work.
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex flex-col gap-2 px-4 pb-6">
          <Button
            variant="ghost"
            className="h-11 justify-start gap-3 rounded-xl px-4"
            onClick={handleResumeClick}
            aria-label="Open resume"
          >
            <FontAwesomeIcon icon={faFileLines} size="lg" />
            Resume
          </Button>

          <Button
            variant="ghost"
            className="h-11 justify-start gap-3 rounded-xl px-4"
            onClick={handleGitHubClick}
            aria-label="Open GitHub profile"
          >
            <FontAwesomeIcon icon={faGithub} size="lg" />
            GitHub
          </Button>

          <Button
            variant="ghost"
            className="h-11 justify-start gap-3 rounded-xl px-4"
            onClick={handleLinkedInClick}
            aria-label="Open LinkedIn profile"
          >
            <FontAwesomeIcon icon={faLinkedin} size="lg" />
            LinkedIn
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
