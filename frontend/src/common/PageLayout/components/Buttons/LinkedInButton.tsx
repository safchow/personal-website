import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button } from '@/components/ui/button';
import { useTrackedClick } from '@/lib/analytics/useTrackedClick';
import { LINKEDIN_URL } from '@/lib/constants';

export const LinkedInButton: React.FC = () => {
  const handleClick = useTrackedClick('linkedin', () => {
    window.open(LINKEDIN_URL, '_blank', 'noopener,noreferrer');
  });

  return (
    <Button asChild variant="ghost" size="icon" aria-label="LinkedIn">
      <a
        href={LINKEDIN_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={faLinkedin} size="lg" />
      </a>
    </Button>
  );
};
