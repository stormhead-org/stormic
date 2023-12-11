import Link from 'next/link.js'
import styles from './LoginButton.module.scss'

export default function LoginButton() {
	return (
		<Link href='/?modal=auth' className={styles.button}>
			Login
		</Link>
	)
}
