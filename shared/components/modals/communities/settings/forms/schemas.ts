import { z } from 'zod'

export const emailSchema = z
	.string()
	.email({ message: 'Введите корректную почту' })
	.optional()
export const userSchema = z.number()
export const communitySchema = z.number()
export const mediaSchema = z.number().optional()
export const titleSchema = z
	.string()
	.min(3, { message: 'Минимум 3 символа в названии' })
	.max(30, { message: 'Максимум 30 символов в названии' })
export const descriptionSchema = z
	.string()
	.max(1000, { message: 'Максимум 100 символов в описании' })
const ruleSchema = z.object({
	communityNameRule: z.string().min(1, 'Название правила обязательно'),
	communityDescriptionRule: z
		.string()
		.max(500, 'Максимум 500 символов')
		.nullable()
		.optional()
})
const tableInfoSchema = z.object({
	label: z.string().min(1, 'Название обязательно'),
	value: z.string().min(1, 'Значение обязательно')
})

export const formCommunitySchema = z.object({
	userId: userSchema,
	title: titleSchema,
	description: descriptionSchema
})
export const formSettingsCommunitySchema = z.object({
	title: titleSchema,
	description: descriptionSchema,
	email: emailSchema,
	rules: z.array(ruleSchema).optional(),
	tableCommunityInfo: z
		.array(tableInfoSchema)
		.max(2, 'Максимум 2 поля')
		.optional()
})

export type TFormCommunityValues = z.infer<typeof formCommunitySchema>
export type TFormSettingsCommunityValues = z.infer<
	typeof formSettingsCommunitySchema
>
