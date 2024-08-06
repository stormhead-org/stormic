import { BellDot } from 'lucide-react'
import { useSession } from 'next-auth/react'
import React from 'react'

interface Props {
	className?: string
}

export const Notifications: React.FC<Props> = ({ className }) => {
	const { data: session } = useSession()

	return <div className={className}>{session ? <BellDot /> : ''}</div>
}
