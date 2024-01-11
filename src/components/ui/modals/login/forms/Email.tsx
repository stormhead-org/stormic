import { yupResolver } from '@hookform/resolvers/yup'
import { ChevronLeft, X } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
// import React from 'react'
import * as React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { LoginFormSchema } from '../../../../../../utils/validations'
import { FormField } from '../../form_fild/FormField'
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
	const form = useForm({
		mode: 'onChange',
		resolver: yupResolver(LoginFormSchema)
	})

	const onSubmit = form.handleSubmit(data => console.log(data))

	// console.log(form.formState.errors)
	return (
		<>
			<FormProvider {...form}>
				<form onSubmit={onSubmit}>
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
								<FormField name='email' label='Почта' type='text' />
								<div className={styles.ErrorsMsgFrame}>
									<label className={styles.ErrorsMsg}>
										{form.formState.errors.email?.message}
									</label>
								</div>

								<FormField name='password' label='пароль' type='password' />
								<div className={styles.ErrorsMsgFrame}>
									<label className={styles.ErrorsMsg}>
										{form.formState.errors.password?.message}
									</label>
								</div>

								<div className={styles.LoginButtonFrame}>
									<button
										className={styles.LoginButton}
										disabled={
											!form.formState.isValid || form.formState.isSubmitting
										}
									>
										Войти
									</button>
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
							<Link href='/#'>правилами пользования сайтом</Link> и даете
							согласие на обработку <Link href='/#'>персональных данных</Link>
						</p>
					</div>
				</form>
			</FormProvider>
		</>
	)
}
