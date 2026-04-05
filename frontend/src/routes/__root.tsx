import {
  Outlet,
  createRootRoute,
  useRouterState,
} from '@tanstack/react-router';

import { Footer, Header } from '@/common/PageLayout/components';

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  return (
    <div className="flex min-h-[100dvh] flex-col gap-6 bg-background px-8 py-6 md:gap-8 md:py-8 lg:px-16">
      <div className="animate-fade-in [animation-delay:0ms]">
        <Header />
      </div>

      <div
        key={pathname}
        className="flex flex-1 min-h-0 animate-fade-in opacity-0"
      >
        <Outlet />
      </div>

      <div className="animate-fade-in opacity-0 [animation-delay:200ms]">
        <Footer />
      </div>
    </div>
  );
}
