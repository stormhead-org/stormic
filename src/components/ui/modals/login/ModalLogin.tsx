'use client'

import { ChevronLeft, Github, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link.js'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useRef } from 'react'
import ModalLoginData from '../../../../../data.js'
import styles from './ModalLogin.module.scss'

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
							<>
								<div className={styles.ModalClose}>
									<button
										className={styles.ButtonModal}
										type='button'
										onClick={() => {
											router.back()
											setFormType('main')
										}}
									>
										<X />
									</button>
								</div>
								<div className={styles.LoginBlock}>
									<div className={styles.LoginBlockFrame}>
										<div className={styles.LoginTxt}>
											<p className={styles.TxtOut}>Вход в аккаунт</p>
										</div>
										<div className={styles.LoginButtons}>
											<div className={styles.LoginButtonFrame}>
												<div className={styles.LoginButtonImg}>
													<Github />
												</div>
												<button className={styles.LoginButton}>
													Продолжить с Google
												</button>
											</div>
											<div className={styles.LoginButtonFrame}>
												<div className={styles.LoginButtonImg}>
													<Github />
												</div>
												<button className={styles.LoginButton}>
													Продолжить с Apple
												</button>
											</div>
											<div className={styles.LoginButtonFrame}>
												<div className={styles.LoginButtonImg}>
													<Github />
												</div>
												<button
													onClick={() => setFormType('email')}
													className={styles.LoginButton}
												>
													Почта
												</button>
											</div>
											<div className={styles.RegUrl}>
												<p>
													Нет аккаунта?{' '}
													<Link
														href=''
														onClick={() => setFormType('registration')}
													>
														Регистрация
													</Link>
												</p>
											</div>
										</div>
									</div>
								</div>
								<div className={styles.LoginPrivacy}>
									<p>
										<Link href='/#'></Link>
										Авторизуясь, Вы соглашаетесь с{' '}
										<Link href='/#'>правилами пользования сайтом</Link> и даете
										согласие на обработку{' '}
										<Link href='/#'>персональных данных</Link>
									</p>
								</div>
							</>
						)}
						{formType === 'email' && (
							<>
								<div className={styles.ModalMenu}>
									<button
										className={styles.ButtonModal}
										onClick={() => setFormType('main')}
									>
										<ChevronLeft />
									</button>
									<button
										className={styles.ButtonModal}
										type='button'
										onClick={() => {
											router.back()
											setFormType('main')
										}}
									>
										<X />
									</button>
								</div>
								<div className={styles.LoginBlock}>
									<div className={styles.LoginBlockFrame}>
										<div className={styles.LoginTxt}>
											<p className={styles.TxtOut}>
												Войти через почту
												<br />
												или{' '}
												<Link
													href=''
													onClick={() => setFormType('registration')}
												>
													зарегистрироваться
												</Link>
											</p>
										</div>
										<div className={styles.LoginButtons}>
											<div className={styles.LoginButtonFrame}>
												<input
													className={styles.LoginInput}
													type='text'
													placeholder='Почта'
												/>
											</div>
											<div className={styles.LoginButtonFrame}>
												<input
													className={styles.LoginInput}
													placeholder='Пароль'
													type='password'
												/>
											</div>
											<div className={styles.LoginButtonFrame}>
												<button
													onClick={() => setFormType('email')}
													className={styles.LoginButton}
												>
													Войти
												</button>
											</div>
											<div className={styles.RegUrl}>
												<Link href='' onClick={() => setFormType('frgtpwd')}>
													Забыли пароль?
												</Link>
											</div>
										</div>
									</div>
								</div>
								<div className={styles.LoginPrivacy}>
									<p>
										<Link href='/#'></Link>
										Авторизуясь, Вы соглашаетесь с{' '}
										<Link href='/#'>правилами пользования сайтом</Link> и даете
										согласие на обработку{' '}
										<Link href='/#'>персональных данных</Link>
									</p>
								</div>
							</>
						)}
						{formType === 'registration' && (
							<>
								<div className={styles.ModalMenu}>
									<button
										className={styles.ButtonModal}
										onClick={() => setFormType('main')}
									>
										<ChevronLeft />
									</button>
									<button
										className={styles.ButtonModal}
										type='button'
										onClick={() => {
											router.back()
											setFormType('main')
										}}
									>
										<X />
									</button>
								</div>
								<div className={styles.LoginBlock}>
									<div className={styles.LoginBlockFrame}>
										<div className={styles.LoginTxt}>
											<p className={styles.TxtOut}>Регистрация</p>
										</div>
										<div className={styles.LoginButtons}>
											<div className={styles.LoginButtonFrame}>
												<div className={styles.LoginButtonImg}>
													<Github />
												</div>
												<button className={styles.LoginButton}>
													Продолжить с Google
												</button>
											</div>
											<div className={styles.LoginButtonFrame}>
												<div className={styles.LoginButtonImg}>
													<Github />
												</div>
												<button className={styles.LoginButton}>
													Продолжить с Apple
												</button>
											</div>
											<div className={styles.LoginButtonFrame}>
												<div className={styles.LoginButtonImg}>
													<Github />
												</div>
												<button
													onClick={() => setFormType('registrationemail')}
													className={styles.LoginButton}
												>
													Почта
												</button>
											</div>
											<div className={styles.RegUrl}>
												<p>
													Есть аккаунт?{' '}
													<Link href='' onClick={() => setFormType('main')}>
														Войти
													</Link>
												</p>
											</div>
										</div>
									</div>
								</div>
								<div className={styles.LoginPrivacy}>
									<p>
										<Link href='/#'></Link>
										Регистрируясь, Вы соглашаетесь с{' '}
										<Link href='/#'>правилами пользования сайтом</Link> и даете
										согласие на обработку{' '}
										<Link href='/#'>персональных данных</Link>
									</p>
								</div>
							</>
						)}
						{formType === 'registrationemail' && (
							<>
								<div className={styles.ModalMenu}>
									<button
										className={styles.ButtonModal}
										onClick={() => setFormType('registration')}
									>
										<ChevronLeft />
									</button>
									<button
										className={styles.ButtonModal}
										type='button'
										onClick={() => {
											router.back()
											setFormType('main')
										}}
									>
										<X />
									</button>
								</div>
								<div className={styles.LoginBlock}>
									<div className={styles.LoginBlockFrame}>
										<div className={styles.LoginTxt}>
											<p className={styles.TxtOut}>Регистрация</p>
										</div>
										<div className={styles.LoginButtons}>
											<div className={styles.LoginButtonFrame}>
												<input
													className={styles.LoginInput}
													type='text'
													placeholder='Имя или название'
												/>
											</div>
											<div className={styles.LoginButtonFrame}>
												<input
													className={styles.LoginInput}
													type='text'
													placeholder='Почта'
												/>
											</div>
											<div className={styles.LoginButtonFrame}>
												<input
													className={styles.LoginInput}
													placeholder='Пароль'
													type='password'
												/>
											</div>
											<div className={styles.LoginButtonFrame}>
												<button
													onClick={() => setFormType('email')}
													className={styles.LoginButton}
												>
													Зарегистрироваться
												</button>
											</div>
										</div>
									</div>
								</div>
								<div className={styles.LoginPrivacy}>
									<p>
										<Link href='/#'></Link>
										Регистрируясь, Вы соглашаетесь с{' '}
										<Link href='/#'>правилами пользования сайтом</Link> и даете
										согласие на обработку{' '}
										<Link href='/#'>персональных данных</Link>
									</p>
								</div>
							</>
						)}
						{formType === 'frgtpwd' && (
							<>
								<div className={styles.ModalMenu}>
									<button
										className={styles.ButtonModal}
										onClick={() => setFormType('email')}
									>
										<ChevronLeft />
									</button>
									<button
										className={styles.ButtonModal}
										type='button'
										onClick={() => {
											router.back()
											setFormType('main')
										}}
									>
										<X />
									</button>
								</div>
								<div className={styles.LoginBlock}>
									<div className={styles.LoginBlockFrame}>
										<div className={styles.LoginTxt}>
											<p className={styles.TxtOut}>Восстановить пароль</p>
										</div>
										<div className={styles.LoginButtons}>
											<div className={styles.LoginButtonFrame}>
												<input
													className={styles.LoginInput}
													placeholder='Почта'
													type='text'
												/>
											</div>
											<div className={styles.LoginButtonFrame}>
												<button
													onClick={() => setFormType('email')}
													className={styles.LoginButton}
												>
													Восстановить
												</button>
											</div>
										</div>
									</div>
								</div>
								<div className={styles.LoginPrivacy}>
									<p>
										<Link href='/#'></Link>
										Авторизуясь, Вы соглашаетесь с{' '}
										<Link href='/#'>правилами пользования сайтом</Link> и даете
										согласие на обработку{' '}
										<Link href='/#'>персональных данных</Link>
									</p>
								</div>
							</>
						)}
					</div>
				</div>
			</dialog>
		) : null

	return dialog
}
