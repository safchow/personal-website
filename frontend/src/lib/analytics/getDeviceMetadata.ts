/**
 * Collects device/viewport metadata for analytics.
 * Low privacy impact: userAgent, viewport, referrer.
 */
export function getDeviceMetadata() {
  return {
    userAgent: navigator.userAgent,
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
    referrer: document.referrer || null,
  };
}
