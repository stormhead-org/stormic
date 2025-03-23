import { z } from 'zod'

export const titleSchema = z.string().min(1).max(100)

export const formTitleSchema = z.object({
	title: titleSchema
})

export type TFormTitleValues = z.infer<typeof formTitleSchema>
