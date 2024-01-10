'use client'

import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useRef } from 'react'
import ModalLoginData from '../../../../../data.js'
import styles from './ModalLogin.module.scss'
import { EmailLoginForm } from './forms/Email'
import { FrgtpwdLoginForm } from './forms/Frgtpwd'
import { MainLoginForm } from './forms/MainForm'
import { RegistrationLoginForm } from './forms/Registration'
import { RegistrationEmailLoginForm } from './forms/RegistrationEmail'

export default function ModalLogin() {
	const router = useRouter()
	const ModalLoginSrc = ModalLoginData
	const searchParams = useSearchParams()
	const dialogRef = useRef<null | HTMLDialogElement>(null)
	const showDialog = searchParams.get('modal')
	const [formType, setFormType] = React.useState<
		'main' | 'email' | 'registration' | 'registrationemail' | 'frgtpwd'
	>('main')

	useEffect(() => {
		if (showDialog === 'auth') {
			dialogRef.current?.showModal()
		}
	}, [showDialog])

	const dialog: JSX.Element | null =
		showDialog === 'auth' ? (
			<dialog ref={dialogRef} className={styles.Modal}>
				<div className={styles.ModalLogin}>
					<div className={styles.FrameLeft}>
						<div className={styles.ModalLogoImg}>
							{ModalLoginSrc.environment.media.project.map(obj => (
								<div key={obj.selfproject.sitelogo}>
									<Image
										className={styles.ModalLogoImgSrc}
										src={obj.selfproject.sitelogo}
										alt='BannerImg'
										width={44}
										height={44}
										style={{ objectFit: 'contain' }}
										priority={true}
									/>
								</div>
							))}
						</div>
						<div className={styles.ModalBannerImg}>
							{ModalLoginSrc.environment.media.project.map(obj => (
								<div key={obj.selfproject.loginmodalimg}>
									<Image
										className={styles.ModalBannerImgSrc}
										src={obj.selfproject.loginmodalimg}
										alt='BannerImg'
										width={1920}
										height={1080}
										style={{ objectFit: 'cover' }}
										priority={true}
									/>
								</div>
							))}
						</div>
					</div>
					<div className={styles.FrameRight}>
						{formType === 'main' && (
							<MainLoginForm
								onOpenRegister={() => setFormType('registration')}
								onOpenMain={() => setFormType('main')}
								onOpenEmail={() => setFormType('email')}
							/>
						)}
						{formType === 'email' && (
							<EmailLoginForm
								onOpenRegister={() => setFormType('registration')}
								onOpenMain={() => setFormType('main')}
								onOpenFrgtpwd={() => setFormType('frgtpwd')}
							/>
						)}
						{formType === 'registration' && (
							<RegistrationLoginForm
								onOpenRegistrationEmail={() => setFormType('registrationemail')}
								onOpenMain={() => setFormType('main')}
							/>
						)}
						{formType === 'registrationemail' && (
							<RegistrationEmailLoginForm
								onOpenRegister={() => setFormType('registration')}
								onOpenMain={() => setFormType('main')}
							/>
						)}
						{formType === 'frgtpwd' && (
							<FrgtpwdLoginForm
								onOpenEmail={() => setFormType('email')}
								onOpenMain={() => setFormType('main')}
							/>
						)}
					</div>
				</div>
			</dialog>
		) : null

	return dialog
}
