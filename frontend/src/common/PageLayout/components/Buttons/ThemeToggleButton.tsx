import { Button } from '@stones';
import { MoonIcon, SunIcon } from 'lucide-react';

import { useTheme } from '@/components/theme-provider';

export const ThemeToggleButton: React.FC = () => {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () =>
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
    >
      <span className="relative inline-block size-5">
        <SunIcon className="absolute inset-0 size-5 opacity-0 transition-opacity duration-[250ms] ease-in-out dark:opacity-100" />
        <MoonIcon className="absolute inset-0 size-5 opacity-100 transition-opacity duration-[250ms] ease-in-out dark:opacity-0" />
      </span>
    </Button>
  );
};
