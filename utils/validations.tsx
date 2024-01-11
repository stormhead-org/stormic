import * as yup from 'yup'

export const LoginFormSchema = yup
	.object({
		email: yup
			.string()
			.email('Некорректная почта')
			.required('Почта обязательна'),
		password: yup
			.string()
			.min(8, 'Минимум 8 символов')
			.required('Укажите пароль')
	})
	.required()

export const RegisterFormSchema = yup
	.object()
	.shape({
		fullName: yup.string().required('Имя или название обязательны')
	})
	.concat(LoginFormSchema)

export const FrgtpwdFormSchema = yup
	.object({
		email: yup
			.string()
			.email('Некорректная почта')
			.required('Почта обязательна')
	})
	.required()
