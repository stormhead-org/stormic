import * as yup from 'yup'

const LoginSchema = yup
	.object({
		firstName: yup.string().required(),
		age: yup.number().positive().integer().required()
	})
	.required()
