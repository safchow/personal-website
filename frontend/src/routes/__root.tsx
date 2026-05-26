import {
  Outlet,
  createRootRoute,
  useRouterState,
} from '@tanstack/react-router';

import { ThemeShortcut } from '@/common/ThemeShortcut';

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  return (
    <div className="flex min-h-[100dvh] flex-col gap-6 bg-background px-8 py-6 md:gap-8 md:py-8 lg:px-16">
      <div className="mx-auto flex flex-1 flex-col w-full max-w-3xl gap-4">
        <div
          key={pathname}
          className="flex flex-1 min-h-0 animate-fade-in opacity-0"
        >
          <Outlet />
        </div>
      </div>

      <ThemeShortcut />
    </div>
  );
}
