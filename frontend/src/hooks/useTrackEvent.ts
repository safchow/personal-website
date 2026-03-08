import { useMutation } from '@tanstack/react-query';

import { getSessionId } from '@/lib/analytics/getSessionId';

const getBaseUrl = (): string =>
  import.meta.env.VITE_API_URL ?? 'http://localhost:8080';

type TrackEventPayload = {
  type: 'click' | 'pageview';
  target?: string;
  path?: string;
};

async function trackEvent(
  payload: TrackEventPayload
): Promise<{ data: { event: unknown } }> {
  const res = await fetch(`${getBaseUrl()}/api/events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sessionId: getSessionId(),
      ...payload,
    }),
  });
  if (!res.ok) throw new Error('Failed to track event');
  return res.json();
}

export function useTrackEvent() {
  return useMutation({
    mutationFn: trackEvent,
  });
}
