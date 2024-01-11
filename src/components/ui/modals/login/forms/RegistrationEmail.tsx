import { yupResolver } from '@hookform/resolvers/yup'
import { ChevronLeft, X } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { RegisterFormSchema } from '../../../../../../utils/validations'
import { FormField } from '../../form_fild/FormField'
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
	const form = useForm({
		mode: 'onChange',
		resolver: yupResolver(RegisterFormSchema)
	})

	const onSubmit = form.handleSubmit(data => console.log(data))

	return (
		<>
			<FormProvider {...form}>
				<form onSubmit={onSubmit}>
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
								<FormField
									name='fullName'
									label='Имя или название'
									type='text'
								/>
								<div className={styles.ErrorsMsgFrame}>
									<label className={styles.ErrorsMsg}>
										{form.formState.errors.fullName?.message}
									</label>
								</div>

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
							согласие на обработку <Link href='/#'>персональных данных</Link>
						</p>
					</div>
				</form>
			</FormProvider>
		</>
	)
}
