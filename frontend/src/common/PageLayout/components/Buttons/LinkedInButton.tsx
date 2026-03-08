import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@stones';

import { LINKEDIN_URL } from '@/lib/constants';

export const LinkedInButton: React.FC = () => {
  return (
    <Button asChild variant="ghost" size="icon" aria-label="LinkedIn">
      <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faLinkedin} className="size-6" />
      </a>
    </Button>
  );
};
