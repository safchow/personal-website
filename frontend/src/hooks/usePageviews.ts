import { useQuery } from '@tanstack/react-query';

import { getBaseUrl } from '@/lib/analytics/getBaseUrl';

interface Pageviews {
  path: string;
  pageviews: number;
  uniqueSessions: number;
}

export function usePageviews(path: string) {
  return useQuery({
    queryKey: ['pageviews', path],
    staleTime: 0,
    refetchOnMount: 'always',
    queryFn: async (): Promise<Pageviews> => {
      const url = new URL(`${getBaseUrl()}/api/events/pageviews`);
      url.searchParams.set('path', path);

      const res = await fetch(url.toString());
      if (!res.ok) {
        throw new Error('Failed to load pageviews');
      }

      const json = (await res.json()) as { data: Pageviews };
      return json.data;
    },
  });
}
