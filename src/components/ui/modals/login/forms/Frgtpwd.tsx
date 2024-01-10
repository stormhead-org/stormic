import { ChevronLeft, X } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import styles from '../ModalLogin.module.scss'

interface LoginFormProps {
	onOpenEmail: () => void
	onOpenMain: () => void
}

export const FrgtpwdLoginForm: React.FC<LoginFormProps> = ({
	onOpenEmail,
	onOpenMain
}) => {
	const router = useRouter()
	return (
		<>
			<div className={styles.ModalMenu}>
				<button className={styles.ButtonModal} onClick={onOpenEmail}>
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
							<button className={styles.LoginButton}>Восстановить</button>
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
