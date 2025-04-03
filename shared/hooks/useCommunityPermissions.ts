// useCommunityPermissions.ts
'use client'

import { useEffect, useState } from 'react'
import { Permissions } from '../lib/permissions'

export const useCommunityPermissions = (
	currentUser: { id: number } | null,
	communityId: number
): {
	permissions: Permissions | null
	loading: boolean
	error: string | null
} => {
	const [permissions, setPermissions] = useState<Permissions | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (!currentUser) {
			setPermissions(null)
			setLoading(false)
			return
		}

		const fetchPermissions = async () => {
			try {
				const response = await fetch(
					`/api/users/${currentUser.id}/permissions?communityId=${communityId}`,
					{
						credentials: 'include'
					}
				)
				if (!response.ok) {
					throw new Error('Failed to fetch permissions')
				}
				const data = await response.json()
				setPermissions(data)
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Unknown error')
			} finally {
				setLoading(false)
			}
		}

		fetchPermissions()
	}, [currentUser, communityId])

	return { permissions, loading, error }
}
