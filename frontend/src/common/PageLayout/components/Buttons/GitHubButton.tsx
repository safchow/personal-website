import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@stones';

import { GITHUB_URL } from '@/lib/constants';

export const GitHubButton: React.FC = () => {
  return (
    <Button asChild variant="ghost" size="icon" aria-label="GitHub">
      <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faGithub} className="size-6" />
      </a>
    </Button>
  );
};
