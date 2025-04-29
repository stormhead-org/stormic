'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Switch } from './switch'

export function ModeToggle() {
	const { setTheme, theme } = useTheme()

	return (
		<Switch onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
			<Sun className='pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0 rotate-0 scale-100 dark:-rotate-90 dark:scale-0' />
			<Moon className='pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0 rotate-90 scale-0 dark:rotate-0 dark:scale-100' />
		</Switch>
	)
}
