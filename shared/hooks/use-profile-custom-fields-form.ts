import { UserProfile } from '@/app/actions'
import {
	formProfileUpdateSchema,
	type TFormProfileUpdateValues
} from '@/shared/components/modals/auth-modal/forms/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { User } from '@prisma/client'
import { useForm, UseFormReturn } from 'react-hook-form'

export function useProfileCustomFieldsForm(data: User, profile: UserProfile | null): UseFormReturn<TFormProfileUpdateValues> {
	return useForm<TFormProfileUpdateValues>({
		resolver: zodResolver(formProfileUpdateSchema),
		defaultValues: {
			id: data.id,
			fullName: data.fullName,
			bio: data.bio || '',
			customFields: profile?.customFields || [] // Задаем значение по умолчанию для customFields
		}
	})
}
