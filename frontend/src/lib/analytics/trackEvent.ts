import { getBaseUrl } from './getBaseUrl';
import { getDeviceMetadata } from './getDeviceMetadata';
import { getSessionId } from './getSessionId';

export type TrackEventPayload = {
  type: 'click' | 'pageview';
  target?: string;
  path?: string;
  metadata?: Record<string, unknown>;
};

export async function trackEvent(
  payload: TrackEventPayload
): Promise<{ data: { event: unknown } }> {
  const res = await fetch(`${getBaseUrl()}/api/events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    keepalive: true,
    body: JSON.stringify({
      sessionId: getSessionId(),
      type: payload.type,
      target: payload.target,
      path: payload.path,
      metadata: JSON.stringify({
        ...getDeviceMetadata(),
        ...payload.metadata,
      }),
    }),
  });
  if (!res.ok) throw new Error('Failed to track event');
  return res.json();
}
