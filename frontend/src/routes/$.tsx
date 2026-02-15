import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/$')({
  component: () => {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-gray-600 mb-4">Page not found</p>
          <a href="/" className="text-blue-600 hover:underline">
            Go to homepage
          </a>
        </div>
      </div>
    );
  },
});
