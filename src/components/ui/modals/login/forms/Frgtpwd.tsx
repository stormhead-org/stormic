import { yupResolver } from '@hookform/resolvers/yup'
import { ChevronLeft, X } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { FrgtpwdFormSchema } from '../../../../../../utils/validations'
import { FormField } from '../../form_fild/FormField'
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
	const form = useForm({
		mode: 'onChange',
		resolver: yupResolver(FrgtpwdFormSchema)
	})

	const onSubmit = form.handleSubmit(data => console.log(data))
	return (
		<>
			<FormProvider {...form}>
				<form onSubmit={onSubmit}>
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
								<FormField name='email' label='Почта' type='text' />
								<div className={styles.ErrorsMsgFrame}>
									<label className={styles.ErrorsMsg}>
										{form.formState.errors.email?.message}
									</label>
								</div>
								<div className={styles.LoginButtonFrame}>
									<button
										className={styles.LoginButton}
										disabled={
											!form.formState.isValid || form.formState.isSubmitting
										}
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
							согласие на обработку <Link href='/#'>персональных данных</Link>
						</p>
					</div>
				</form>
			</FormProvider>
		</>
	)
}
