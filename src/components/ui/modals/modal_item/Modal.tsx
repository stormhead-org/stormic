'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'
import style from './Modal.module.scss'

type Props = {
	children: React.ReactNode
}

export default function Modal({ children }: Props) {
	const searchParams = useSearchParams()
	const dialogRef = useRef<null | HTMLDialogElement>(null)
	const showDialog = searchParams.get('modal')

	useEffect(() => {
		if (showDialog === 'auth') {
			dialogRef.current?.showModal()
		} else {
			// dialogRef.current?.close()
		}
	}, [showDialog])

	const dialog: JSX.Element | null =
		showDialog === 'auth' ? (
			<dialog ref={dialogRef} className={style.Modal}>
				<div className=''>{children}</div>
			</dialog>
		) : null

	return dialog
}
