'use client'

import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import styles from './ModalClose.module.scss'

export default function ModalClose() {
	const router = useRouter()
	return (
		<>
			<div className={styles.Modal}>
				<button type='button' onClick={() => router.back()}>
					<X />
				</button>
			</div>
		</>
	)
}
