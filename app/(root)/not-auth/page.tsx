import { NotAuthLock } from '@/shared/components/info-blocks/not-auth-lock'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Stormic: Ошибка авторизации'
}

export default function UnauthorizedPage() {
	return <NotAuthLock />
}
