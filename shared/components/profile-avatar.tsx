"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/shared/components/ui/avatar";
import { cn } from '@/shared/lib/utils'
import { CircleUser } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface Props {
	avatarImage: string
	className?: string
}

export const ProfileAvatar: React.FC<Props> = ({
  avatarImage,
  className,
  }) => {
	return (
		<Link href='/profile'>
				<Avatar className={cn('border-2 border-secondary rounded-full', className)}>
					<AvatarImage src={avatarImage} />
					<AvatarFallback>
						<CircleUser />
					</AvatarFallback>
				</Avatar>
		</Link>
	);
};
