'use client'

import { useTheme } from '@/shared/providers/Theme'
import { Moon, Sun } from 'lucide-react'
import { Switch } from './switch'

export function ModeToggle() {
	const { theme, setTheme } = useTheme()

	const isChecked = theme === 'dark'

	const toggleTheme = () => {
		setTheme(isChecked ? 'light' : 'dark')
	}

	return (
		<Switch checked={isChecked} onCheckedChange={toggleTheme}>
			<Sun className='pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0 rotate-0 scale-100 dark:-rotate-90 dark:scale-0' />
			<Moon className='pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0 rotate-90 scale-0 dark:rotate-0 dark:scale-100' />
		</Switch>
	)
}
