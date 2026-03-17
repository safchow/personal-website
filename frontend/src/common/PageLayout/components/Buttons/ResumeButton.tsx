import { faFileLines } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button } from '@/components/ui/button';
import { useTrackedClick } from '@/lib/analytics/useTrackedClick';
import { RESUME_URL } from '@/lib/constants';

export const ResumeButton: React.FC = () => {
  const handleClick = useTrackedClick('resume', () => {
    window.open(RESUME_URL, '_blank', 'noopener,noreferrer');
  });

  return (
    <Button asChild variant="ghost" size="icon" aria-label="Resume">
      <a
        href={RESUME_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={faFileLines} className="size-6" />
      </a>
    </Button>
  );
};
