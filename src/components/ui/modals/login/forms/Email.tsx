import { ChevronLeft, X } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import styles from '../ModalLogin.module.scss'

interface LoginFormProps {
	onOpenRegister: () => void
	onOpenMain: () => void
	onOpenFrgtpwd: () => void
}

export const EmailLoginForm: React.FC<LoginFormProps> = ({
	onOpenRegister,
	onOpenMain,
	onOpenFrgtpwd
}) => {
	const router = useRouter()
	return (
		<>
			<div className={styles.ModalMenu}>
				<button className={styles.ButtonModal} onClick={onOpenMain}>
					<ChevronLeft />
				</button>
				<button
					className={styles.ButtonModal}
					type='button'
					onClick={() => {
						onOpenMain()
						router.back()
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
							<Link href='' onClick={onOpenRegister}>
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
							<button className={styles.LoginButton}>Войти</button>
						</div>
						<div className={styles.RegUrl}>
							<Link href='' onClick={onOpenFrgtpwd}>
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
					<Link href='/#'>правилами пользования сайтом</Link> и даете согласие
					на обработку <Link href='/#'>персональных данных</Link>
				</p>
			</div>
		</>
	)
}
