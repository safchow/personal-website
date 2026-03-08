import { faFileLines } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@stones';

import { RESUME_URL } from '@/lib/constants';

export const ResumeButton: React.FC = () => {
  return (
    <Button asChild variant="ghost" size="icon" aria-label="Resume">
      <a href={RESUME_URL} target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faFileLines} className="size-6" />
      </a>
    </Button>
  );
};
