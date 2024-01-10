import * as yup from 'yup'

export const LoginSchema = yup
	.object({
		email: yup.string().email('Неверная почта').required('Почта обязательна'),
		password: yup
			.string()
			.min(8, 'Минимум 8 символов')
			.required('Укажите пароль')
	})
	.required()
