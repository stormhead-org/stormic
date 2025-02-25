import { z } from 'zod'

// Определение полей customFields
export const customFieldSchema = z.object({
	id: z.number(),
	key: z.string(),
	value: z.string()
})

export const emailSchema = z
	.string()
	.email({ message: 'Введите корректную почту' })
export const fullName = z.string().min(2, { message: 'Введите имя и фамилию' })
export const passwordSchema = z
	.string()
	.min(8, { message: 'Введите корректный пароль' })

export const formLoginSchema = z.object({
	email: emailSchema,
	password: passwordSchema
})

export const formRegisterSchema = formLoginSchema
	.merge(
		z.object({
			fullName: fullName,
			confirmPassword: passwordSchema
		})
	)
	.refine(data => data.password === data.confirmPassword, {
		message: 'Пароли не совпадают',
		path: ['confirmPassword']
	})

export const formProfileUpdateSchema = z.object({
	id: z.number(),
	fullName: fullName,
	bio: z.string().max(250, { message: 'Максимум 250 символов' }),
	customFields: z.array(customFieldSchema) // Добавлено поле customFields
})

export const formAccountUpdateSchema = formLoginSchema.merge(
	z.object({
		id: z.number()
	})
)

export const formNewPasswordUpdateSchema = z.object({
	id: z.number(),
	newPassword: passwordSchema.optional(),
	confirmPassword: passwordSchema.optional()
})

export type TFormNewPasswordUpdateValues = z.infer<
	typeof formNewPasswordUpdateSchema
>
export type TFormAccountUpdateValues = z.infer<typeof formAccountUpdateSchema>
export type TFormProfileUpdateValues = z.infer<typeof formProfileUpdateSchema>
export type TFormLoginValues = z.infer<typeof formLoginSchema>
export type TFormRegisterValues = z.infer<typeof formRegisterSchema>
