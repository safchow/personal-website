import { useQuery } from '@tanstack/react-query';

import { getBaseUrl } from '@/lib/analytics/getBaseUrl';

interface Clicks {
  count: number;
  path: string;
  target: string;
}

export function useClicks(args: { path: string; target: string }) {
  return useQuery({
    queryKey: ['clicks', args.path, args.target],
    queryFn: async (): Promise<Clicks> => {
      const url = new URL(`${getBaseUrl()}/api/events/clicks`);
      url.searchParams.set('path', args.path);
      url.searchParams.set('target', args.target);

      const res = await fetch(url.toString());
      if (!res.ok) {
        throw new Error('Failed to load clicks');
      }

      const json = (await res.json()) as { data: Clicks };
      return json.data;
    },
  });
}
