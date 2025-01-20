import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700
                transition-all duration-300 active:scale-95"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="relative w-6 h-6">
        <div className={`absolute inset-0 transform transition-transform duration-500 ${isDark ? 'rotate-0' : '-rotate-90 scale-0'}`}>
          <MoonIcon className="w-6 h-6 text-gray-600 dark:text-yellow-300" />
        </div>
        <div className={`absolute inset-0 transform transition-transform duration-500 ${isDark ? 'rotate-90 scale-0' : 'rotate-0'}`}>
          <SunIcon className="w-6 h-6 text-yellow-500" />
        </div>
      </div>
    </button>
  );
}
