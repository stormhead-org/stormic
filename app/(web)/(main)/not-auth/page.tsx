import type { User } from '@/payload-types'
import { NotAuthLock } from '@/shared/components/info-blocks/not-auth-lock'
import { getSession } from '@/shared/lib/auth'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
	title: 'Stormic: Ошибка авторизации'
}

export default async function NotAuth() {
	const session = (await getSession()) as { user: User } | null
	const currentUser = session && session.user

	if (currentUser) {
		return redirect('/')
	}

	return <NotAuthLock className='m-2 lg:m-0' />
}
