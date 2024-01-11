import { Github, X } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import styles from '../ModalLogin.module.scss'

interface LoginFormProps {
	onOpenRegister: () => void
	onOpenMain: () => void
	onOpenEmail: () => void
}

export const MainLoginForm: React.FC<LoginFormProps> = ({
	onOpenRegister,
	onOpenMain,
	onOpenEmail
}) => {
	const router = useRouter()
	return (
		<>
			<div className={styles.ModalClose}>
				<button
					className={styles.ButtonModal}
					type='button'
					onClick={() => {
						router.back()
						onOpenMain()
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
						<div className={styles.ErrorsMsgFrame} />
						<div className={styles.LoginButtonFrame}>
							<div className={styles.LoginButtonImg}>
								<Github />
							</div>
							<button className={styles.LoginButton}>Продолжить с Apple</button>
						</div>
						<div className={styles.ErrorsMsgFrame} />
						<div className={styles.LoginButtonFrame}>
							<div className={styles.LoginButtonImg}>
								<Github />
							</div>
							<button onClick={onOpenEmail} className={styles.LoginButton}>
								Почта
							</button>
						</div>
						<div className={styles.ErrorsMsgFrame} />
						<div className={styles.RegUrl}>
							<p>
								Нет аккаунта?{' '}
								<Link href='' onClick={onOpenRegister}>
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
					<Link href='/#'>правилами пользования сайтом</Link> и даете согласие
					на обработку <Link href='/#'>персональных данных</Link>
				</p>
			</div>
		</>
	)
}
