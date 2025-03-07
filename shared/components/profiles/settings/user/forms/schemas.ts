import { z } from 'zod'

export const emailSchema = z
	.union([
		z.string().email({ message: 'Введите корректную почту' }),
		z.literal('')
	])
	.optional()
export const userSchema = z.number()
export const mediaSchema = z.number().optional()
export const nameSchema = z
	.string()
	.min(3, { message: 'Минимум 3 символа в имени' })
	.max(30, { message: 'Максимум 30 символов в имени' })
export const descriptionSchema = z
	.string()
	.max(1000, { message: 'Максимум 1000 символов в описании' })
const tableInfoSchema = z.object({
	label: z.string().min(1, 'Название обязательно'),
	value: z.string().min(1, 'Значение обязательно')
})

export const formUserSchema = z.object({
	userId: userSchema,
	name: nameSchema,
	description: descriptionSchema
})
export const formSettingsUserSchema = z.object({
	name: nameSchema,
	description: descriptionSchema,
	tableInfo: z.array(tableInfoSchema).max(2, 'Максимум 2 поля').optional()
})

export const formSettingsAccountUserSchema = z.object({
	email: emailSchema.optional()
})

export type TFormUserValues = z.infer<typeof formUserSchema>
export type TFormSettingsUserValues = z.infer<typeof formSettingsUserSchema>
export type TFormSettingsAccountUserValues = z.infer<
	typeof formSettingsAccountUserSchema
>
