import { useTrackEvent } from '@/hooks/useTrackEvent';

/**
 * Returns a click handler that tracks the event, then runs the given action.
 * Use for buttons/links where you want analytics before executing the action.
 */
export function useTrackedClick(
  target: string,
  action: () => void | Promise<void>
) {
  const { mutateAsync: trackEvent } = useTrackEvent();

  return (e: React.MouseEvent) => {
    e.preventDefault();
    void trackEvent({
      type: 'click',
      target,
      path: window.location.pathname,
    }).finally(() => {
      void action();
    });
  };
}
