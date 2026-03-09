import { useTrackEvent } from '@/hooks/useTrackEvent';

/**
 * Returns a click handler that runs the action immediately and tracks the event in the background (fire-and-forget).
 * Use for buttons/links where you want analytics without blocking the user action.
 */
export function useTrackedClick(
  target: string,
  action: () => void | Promise<void>
) {
  const { mutateAsync: trackEvent } = useTrackEvent();

  return (e: React.MouseEvent) => {
    e.preventDefault();
    void action();
    void trackEvent({
      type: 'click',
      target,
      path: window.location.pathname,
    });
  };
}
