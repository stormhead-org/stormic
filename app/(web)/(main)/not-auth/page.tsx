import type { User } from '@/payload-types'
import { NotAuthLock } from '@/shared/components/info-blocks/not-auth-lock'
import { getSession } from '@/shared/lib/auth'
import configPromise from '@payload-config'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'

export const metadata: Metadata = {
	title: 'Stormic: Ошибка авторизации'
}

export default async function NotAuth() {
	const session = (await getSession()) as { user: User } | null
	const currentUser = session && session.user
	
	if (currentUser) {
		return redirect('/')
	}
	
	return <NotAuthLock />
}
