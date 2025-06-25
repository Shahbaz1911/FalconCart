'use client';

import { useTheme } from 'next-themes';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const isDarkMode = theme === 'dark';

  const toggleTheme = () => {
    setTheme(isDarkMode ? 'light' : 'dark');
  };

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="theme-mode"
        checked={isDarkMode}
        onCheckedChange={toggleTheme}
      />
      <Label htmlFor="theme-mode">Dark Mode</Label>
    </div>
  );
}
