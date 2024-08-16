'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar'
import { cn } from '@/shared/lib/utils'
import { CircleUser } from 'lucide-react'
import React from 'react'

interface Props {
	avatarImage: string
	className?: string
}

export const ProfileAvatar: React.FC<Props> = ({
	                                               avatarImage,
	                                               className
                                               }) => {
	return (
		<Avatar className={cn('border-2 border-secondary rounded-full hover:border-blue-600', className)}>
			<AvatarImage src={avatarImage} />
			<AvatarFallback>
				<CircleUser />
			</AvatarFallback>
		</Avatar>
	)
}
