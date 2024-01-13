import { yupResolver } from '@hookform/resolvers/yup'
import { ChevronLeft, X } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { setCookie } from 'nookies'
import * as React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useAppDispatch } from '../../../../../../redux/hooks'
import { setUserData } from '../../../../../../redux/slices/user'
import { UserApi } from '../../../../../../utils/api/page'
import { LoginDto } from '../../../../../../utils/api/types'
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
	const dispatch = useAppDispatch()
	const [errorMessage, setErrorMessage] = React.useState('')
	const router = useRouter()
	const form = useForm({
		mode: 'onChange',
		resolver: yupResolver(LoginFormSchema)
	})

	const onSubmit = async (dto: LoginDto) => {
		try {
			const data = await UserApi.login(dto)
			console.log(data)
			setCookie(null, 'authToken', data.token, {
				maxAge: 30 * 24 * 60 * 60,
				path: ''
			})
			setErrorMessage('')
			dispatch(setUserData(data))
		} catch (err: any) {
			console.warn('Auth Error', err)
			if (err.response) {
				setErrorMessage(err.response.data.message)
			}
		}
	}

	return (
		<>
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
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
									{errorMessage && (
										<p className={styles.browserErrorMsg}>{errorMessage}</p>
									)}
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
