// frontend/components/ThemeSwitcher.tsx
import useTheme from '../hooks/useTheme'
import { Sun, Moon } from 'lucide-react'

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme()
  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800"
    >
      {theme === 'light'
        ? <Moon className="text-accent" size={20}/>
        : <Sun  className="text-primary" size={20}/>}
    </button>
  )
}
