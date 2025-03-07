import { z } from 'zod'

export const emailSchema = z
	.union([
		z.string().email({ message: 'Введите корректную почту' }),
		z.literal('')
	])
	.optional()
export const userSchema = z.number()
export const hostSchema = z.number()
export const mediaSchema = z.number().optional()
export const titleSchema = z
	.string()
	.min(3, { message: 'Минимум 3 символа в названии' })
	.max(30, { message: 'Максимум 30 символов в названии' })
export const sloganSchema = z
	.string()
	.min(3, { message: 'Минимум 3 символа в слогане' })
	.max(30, { message: 'Максимум 20 символов в слогане' })
export const descriptionSchema = z
	.string()
	.max(1000, { message: 'Максимум 1000 символов в описании' })
const ruleSchema = z.object({
	nameRule: z.string().min(1, 'Название правила обязательно'),
	descriptionRule: z
		.string()
		.max(500, 'Максимум 500 символов')
		.nullable()
		.optional()
})

export const formHostSchema = z.object({
	userId: userSchema,
	title: titleSchema,
	description: descriptionSchema
})
export const formSettingsHostSchema = z.object({
	title: titleSchema,
	slogan: sloganSchema,
	description: descriptionSchema,
	email: emailSchema.optional(),
})

export const formSettingsRulesHostSchema = z.object({
	rules: z.array(ruleSchema).optional(),
})

export type TFormHostValues = z.infer<typeof formHostSchema>

export type TFormSettingsHostValues = z.infer<
	typeof formSettingsHostSchema
>
export type TFormSettingsRulesHostValues = z.infer<
	typeof formSettingsRulesHostSchema
>
