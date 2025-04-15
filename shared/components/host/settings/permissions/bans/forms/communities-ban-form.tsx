'use client'

import { Community, HostCommunitiesBan } from '@/payload-types'
import { HostCommunitiesBansModal } from '@/shared/components/modals/host-communities-bans-modal'
import {
	Avatar,
	AvatarFallback,
	AvatarImage
} from '@/shared/components/ui/avatar'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { getMediaUrl } from '@/shared/utils/payload/getTypes'
import { CircleUser, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import qs from 'qs'
import React, { useState } from 'react'

interface Props {
	communities: Community[]
	hostCommunitiesBans: HostCommunitiesBan[]
	setType: React.Dispatch<React.SetStateAction<'users' | 'communities'>>
}

export const CommunitiesBanForm: React.FC<Props> = ({
	communities,
	hostCommunitiesBans,
	setType
}) => {
	const router = useRouter()
	const [searchTerm, setSearchTerm] = useState<string>('')
	const [openAddCommunityModal, setOpenAddCommunityModal] = useState(false)

	const filteredBans = hostCommunitiesBans.filter(ban => {
		const community = ban.community as Community
		return community.title.toLowerCase().includes(searchTerm.toLowerCase())
	})

	const handleSubmitDeleteBan = async (banId: number, communityId: number) => {
		try {
			// Удаляем запись из hostCommunitiesBans
			const stringifiedQuery = qs.stringify(
				{
					where: {
						id: { equals: banId }
					}
				},
				{ addQueryPrefix: true }
			)
			const deleteResponse = await fetch(
				`/api/hostCommunitiesBans${stringifiedQuery}`,
				{
					method: 'DELETE',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json'
					}
				}
			)
			if (!deleteResponse.ok) {
				throw new Error('Ошибка при удалении бана сообщества')
			}

			// Обновляем COMMUNITY_HAS_BANNED в коллекции communities
			const updateResponse = await fetch(`/api/communities/${communityId}`, {
				method: 'PATCH',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					COMMUNITY_HAS_BANNED: false
				})
			})
			if (!updateResponse.ok) {
				throw new Error('Ошибка при обновлении статуса COMMUNITY_HAS_BANNED')
			}

			router.refresh()
		} catch (err) {
			console.log('Ошибка при разбане сообщества:', err)
		}
	}

	return (
		<div className='mt-4'>
			<div className='flex justify-center items-center gap-4'>
				<div className='border-b-2 border-b-secondary hover:border-b-blue-600 cursor-pointer'>
					<p onClick={() => setType('users')}>Участники</p>
				</div>
				<div className='border-b-2 border-b-blue-600 cursor-pointer'>
					<p>Сообщества</p>
				</div>
			</div>
			<div className='mt-4'>
				<div className='flex gap-2'>
					<Input
						type='text'
						placeholder='Поиск заблокированных сообществ...'
						className='h-10 w-full px-2 rounded-md bg-gray-700'
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value)}
					/>
					<HostCommunitiesBansModal
						open={openAddCommunityModal}
						onClose={() => setOpenAddCommunityModal(false)}
						communities={communities}
						bannedCommunities={hostCommunitiesBans.map(
							ban => (ban.community as Community).id
						)}
					/>
					<Button
						variant='blue'
						onClick={() => setOpenAddCommunityModal(true)}
						className='px-6'
					>
						Заблокировать
					</Button>
				</div>
				<div className='mt-2'>
					{filteredBans.length === 0 ? (
						<div className='p-2 text-gray-500'>
							Заблокированные сообщества не найдены
						</div>
					) : (
						<div className='flex flex-col'>
							{filteredBans.map(ban => {
								const community = ban.community as Community
								const communityLogoUrl =
									typeof community.logo === 'object'
										? getMediaUrl(community.logo, '/logo.png')
										: '/logo.png'
								return (
									<div
										key={ban.id}
										className='flex w-full px-2 py-1 cursor-pointer hover:bg-gray-600 bg-gray-700 rounded-md mt-2 items-center justify-between'
									>
										<div className='flex w-11/12'>
											<div className='w-full flex justify-items-start items-center gap-2 bg-transparent text-primary'>
												<Avatar className='rounded-full'>
													<AvatarImage
														className='m-auto rounded-full'
														src={communityLogoUrl}
														style={{ width: 34, height: 34 }}
													/>
													<AvatarFallback>
														<CircleUser />
													</AvatarFallback>
												</Avatar>
												<span>{community.title}</span>
											</div>
										</div>
										<div className='group -my-7 w-1/12'>
											<p className='flex p-1 items-center justify-end group-hover:text-blue-700 font-bold'>
												<X
													className='group-hover:bg-blue-800/20 rounded-full ml-2 w-7 h-7 p-1'
													onClick={async () => {
														try {
															await handleSubmitDeleteBan(ban.id, community.id)
														} catch (error) {
															console.error(
																'Ошибка при разбане сообщества:',
																error
															)
														}
													}}
												/>
											</p>
										</div>
									</div>
								)
							})}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
