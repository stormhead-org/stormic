'use client';

import { ProfileAvatar } from '@/shared/components';
import UserFollowButton from '@/shared/components/user-follow-button';
import { cn } from '@/shared/lib/utils';
import { getMediaUrl } from '@/shared/utils/payload/getTypes';
import React from 'react';
import { Community, User, Media } from '@/payload-types';
import { Permissions } from '@/shared/lib/permissions';
import { GripHorizontal, Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';
import CommunityFollowButton from '../../community-follow-button';

interface Props {
	data: User | Community;
	currentUser?: User;
	permissions?: Permissions | null;
	hasUser: boolean;
	className?: string;
}

export const ProfileHeader: React.FC<Props> = ({
	                                               data,
	                                               currentUser,
	                                               permissions,
	                                               hasUser,
	                                               className,
                                               }) => {
	const router = useRouter();
	
	// Определяем avatarImageUrl
	const avatarImageUrl = 'avatar' in data
		? getMediaUrl(data.avatar, '/logo.png')
		: 'logo' in data && getMediaUrl(data.logo, '/logo.png');
	
	// Определяем bannerImageUrl
	const bannerImageUrl = getMediaUrl(data.banner, '/defaultBanner.jpg');
	
	// Определяем имя или название
	const displayName = 'name' in data ? data.name : (data as Community).title || '#';
	
	return (
		<div className={cn('', className)}>
			<img
				className="rounded-t-md object-cover object-center w-full h-[120px]"
				src={bannerImageUrl}
				alt="Profile Banner"
			/>
			<div className="-mt-10 mx-6">
				<div className="flex w-full justify-between mb-2">
					<ProfileAvatar
						className="w-24 h-24 border-none bg-secondary hover:bg-secondary"
						avatarImage={String(avatarImageUrl)}
						avatarSize={92}
					/>
					<div className="flex items-center">
						<div className="mt-16">
							{currentUser &&
								(hasUser ? (
									currentUser.id !== data.id && <UserFollowButton userId={data.id} />
								) : (
									<CommunityFollowButton communityId={data.id} />
								))}
						</div>
						
						<div className="flex items-center hover:text-blue-700 font-bold cursor-pointer mt-auto">
							{currentUser &&
								(hasUser ? (
									currentUser.id === data.id && (
										<Settings
											className="hover:bg-blue-800/20 rounded-full ml-2 w-7 h-7 p-1"
											onClick={() => router.push('/settings/profile')}
										/>
									)
								) : (
									permissions?.COMMUNITY_OWNER && (
										<Settings
											className="hover:bg-blue-800/20 rounded-full ml-2 w-7 h-7 p-1"
											onClick={() => router.push(`/settings/community/${data.id}/main`)}
										/>
									)
								))}
						</div>
						
						<div className="flex items-center hover:text-blue-700 font-bold cursor-pointer mt-auto">
							<GripHorizontal className="hover:bg-blue-800/20 rounded-full ml-2 w-7 h-7 p-1" />
						</div>
					</div>
				</div>
				<span className="font-bold text-2xl">{displayName}</span>
				{hasUser && (
					<>
						<span className="text-md text-green-500 font-bold">+{0}</span>
					</>
				)}
			</div>
		</div>
	);
};