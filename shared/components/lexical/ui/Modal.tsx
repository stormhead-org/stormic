import { isDOMNode } from 'lexical'
import type { JSX } from 'react'
import { ReactNode, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

function PortalImpl({
	onClose,
	children,
	title,
	closeOnClickOutside
}: {
	children: ReactNode
	closeOnClickOutside: boolean
	onClose: () => void
	title: string
}) {
	const modalRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (modalRef.current !== null) {
			modalRef.current.focus()
		}
	}, [])

	useEffect(() => {
		let modalOverlayElement: HTMLElement | null = null
		const handler = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose()
			}
		}
		const clickOutsideHandler = (event: MouseEvent) => {
			const target = event.target
			if (
				modalRef.current !== null &&
				isDOMNode(target) &&
				!modalRef.current.contains(target) &&
				closeOnClickOutside
			) {
				onClose()
			}
		}
		const modelElement = modalRef.current
		if (modelElement !== null) {
			modalOverlayElement = modelElement.parentElement
			if (modalOverlayElement !== null) {
				modalOverlayElement.addEventListener('click', clickOutsideHandler)
			}
		}

		window.addEventListener('keydown', handler)

		return () => {
			window.removeEventListener('keydown', handler)
			if (modalOverlayElement !== null) {
				modalOverlayElement?.removeEventListener('click', clickOutsideHandler)
			}
		}
	}, [closeOnClickOutside, onClose])

	return (
		<div className='fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-60 z-50'>
			<div
				className='bg-white p-5 min-w-[300px] min-h-[100px] flex flex-col relative rounded-xl shadow-lg'
				tabIndex={-1}
				ref={modalRef}
			>
				<h2 className='text-gray-700 mb-2 pb-2 border-b border-gray-300'>
					{title}
				</h2>
				<button
					className='absolute top-2 right-2 w-8 h-8 flex justify-center items-center text-center cursor-pointer bg-gray-200 rounded-full hover:bg-gray-300'
					aria-label='Close modal'
					type='button'
					onClick={onClose}
				>
					X
				</button>
				<div className='pt-5'>{children}</div>
			</div>
		</div>
	)
}

export default function Modal({
	onClose,
	children,
	title,
	closeOnClickOutside = false
}: {
	children: ReactNode
	closeOnClickOutside?: boolean
	onClose: () => void
	title: string
}): JSX.Element {
	return createPortal(
		<PortalImpl
			onClose={onClose}
			title={title}
			closeOnClickOutside={closeOnClickOutside}
		>
			{children}
		</PortalImpl>,
		document.body
	)
}
