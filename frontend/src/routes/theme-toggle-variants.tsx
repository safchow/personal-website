import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/theme-toggle-variants')({
  component: Outlet,
});
