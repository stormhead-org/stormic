import { ChevronLeft, X } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import styles from '../ModalLogin.module.scss'

interface LoginFormProps {
	onOpenRegister: () => void
	onOpenMain: () => void
}

export const RegistrationEmailLoginForm: React.FC<LoginFormProps> = ({
	onOpenRegister,
	onOpenMain
}) => {
	const router = useRouter()
	return (
		<>
			<div className={styles.ModalMenu}>
				<button className={styles.ButtonModal} onClick={onOpenRegister}>
					<ChevronLeft />
				</button>
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
							<button className={styles.LoginButton}>Зарегистрироваться</button>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.LoginPrivacy}>
				<p>
					<Link href='/#'></Link>
					Регистрируясь, Вы соглашаетесь с{' '}
					<Link href='/#'>правилами пользования сайтом</Link> и даете согласие
					на обработку <Link href='/#'>персональных данных</Link>
				</p>
			</div>
		</>
	)
}
