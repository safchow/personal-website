import { getDeviceMetadata } from './getDeviceMetadata';
import { getSessionId } from './getSessionId';

const getBaseUrl = (): string =>
  import.meta.env.VITE_API_URL ?? 'http://localhost:8080';

export type TrackEventPayload = {
  type: 'click' | 'pageview';
  target?: string;
  path?: string;
};

export async function trackEvent(
  payload: TrackEventPayload
): Promise<{ data: { event: unknown } }> {
  const res = await fetch(`${getBaseUrl()}/api/events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sessionId: getSessionId(),
      ...payload,
      metadata: JSON.stringify(getDeviceMetadata()),
    }),
  });
  if (!res.ok) throw new Error('Failed to track event');
  return res.json();
}
