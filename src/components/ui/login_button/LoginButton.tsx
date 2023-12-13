'use client'

import { usePathname, useRouter } from 'next/navigation'
import styles from './LoginButton.module.scss'

export default function LoginButton() {
	const router = useRouter()
	const location = usePathname()
	// console.log(location)

	return (
		<button
			type='button'
			className={styles.ButtonLogin}
			onClick={() => router.push('/?modal=auth')}
		>
			Войти
		</button>
	)
}
