import { getUserInfo, UserProfile } from '@/app/actions'
import { useEffect, useState } from 'react'

export function useProfileCustomFields(userId: number) {
	const [profile, setProfile] = useState<UserProfile | null>(null)
	const [loading, setLoading] = useState(true)
	
	useEffect(() => {
		async function fetchProfile() {
			try {
				const profileData = await getUserInfo(userId)
				
				// Обработка значения bio, чтобы соответствовать типу string
				const normalizedProfileData: UserProfile = {
					...profileData,
					bio: profileData.bio ?? ''
				}
				
				setProfile(normalizedProfileData)
			} catch (error) {
				console.error('Error fetching profile:', error)
			} finally {
				setLoading(false)
			}
		}
		
		fetchProfile()
	}, [userId])
	
	const updateCustomField = (id: number, key: string, value: string) => {
		if (profile) {
			const updatedFields = profile.customFields.map((field: any) =>
				field.id === id ? { ...field, key, value } : field
			)
			setProfile({ ...profile, customFields: updatedFields })
		}
	}
	
	return { profile, loading, updateCustomField }
}
