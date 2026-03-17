import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button } from '@/components/ui/button';
import { useTrackedClick } from '@/lib/analytics/useTrackedClick';
import { GITHUB_URL } from '@/lib/constants';

export const GitHubButton: React.FC = () => {
  const handleClick = useTrackedClick('github', () => {
    window.open(GITHUB_URL, '_blank', 'noopener,noreferrer');
  });

  return (
    <Button asChild variant="ghost" size="icon" aria-label="GitHub">
      <a
        href={GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={faGithub} className="size-6" />
      </a>
    </Button>
  );
};
