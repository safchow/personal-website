import { useMutation } from '@tanstack/react-query';

import { trackEvent } from '@/lib/analytics/trackEvent';

export function useTrackEvent() {
  return useMutation({
    mutationFn: trackEvent,
  });
}
