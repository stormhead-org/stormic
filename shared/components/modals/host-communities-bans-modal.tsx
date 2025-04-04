'use client'

import { Community } from '@/payload-types'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from '@/shared/components/ui/dialog'
import { CircleUser } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
import { Input } from '../ui/input'

interface Props {
	communities: Community[]
	open: boolean
	onClose: () => void
	bannedCommunities: number[]
}

interface CommunityWithDetails {
	id: number
	title: string
	logo?: { url: string }
}

export const HostCommunitiesBansModal: React.FC<Props> = ({
	communities,
	bannedCommunities,
	open,
	onClose
}) => {
	const handleClose = () => {
		onClose()
	}

	const router = useRouter()
	const [searchTerm, setSearchTerm] = useState<string>('')
	const [selectedCommunities, setSelectedCommunities] = useState<number[]>([])

	const filteredCommunities = communities.filter(item => {
		const community = item as CommunityWithDetails
		return (
			typeof community === 'object' &&
			community != null &&
			'title' in community &&
			typeof community.title === 'string' &&
			community.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
			!bannedCommunities.includes(community.id)
		)
	})

	const banCommunity = async (communityId: number) => {
		try {
			const req = await fetch('/api/hostCommunitiesBans', {
				method: 'POST',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					community: communityId
				})
			})
			if (!req.ok) {
				throw new Error('Ошибка при бане сообщества')
			}
		} catch (err) {
			console.log('Ошибка при бане сообщества:', err)
			throw err
		}
	}

	const handleSubmitBanUsers = async (communityIds: number[]) => {
		try {
			// Фильтруем только те сообщества, которых ещё нет в bannedCommunities
			const newCommunitiesToBan = communityIds.filter(
				communityId => !bannedCommunities.includes(communityId)
			)
			if (newCommunitiesToBan.length === 0) {
				handleClose()
				return
			}

			await Promise.all(
				newCommunitiesToBan.map(communityId => banCommunity(communityId))
			)
			setSelectedCommunities([])
			handleClose()
			router.refresh()
		} catch (err) {
			console.log('Ошибка при бане сообщества:', err)
		}
	}

	const handleCheckboxChange = (communityId: number, checked: boolean) => {
		setSelectedCommunities(prev => {
			if (checked) {
				if (prev.length < 30) {
					return [...prev, communityId]
				}
				return prev
			} else {
				return prev.filter(id => id !== communityId)
			}
		})
	}

	const handleBanSelectedCommunities = async () => {
		if (selectedCommunities.length > 0) {
			await handleSubmitBanUsers(selectedCommunities)
		}
	}

	return (
		<Dialog open={open} onOpenChange={handleClose}>
			<DialogContent className='p-2 w-[40vw]'>
				<DialogHeader className='pt-8'>
					<DialogTitle className='text-2xl text-center font-bold'>
						Блокировка сообществ
					</DialogTitle>
					<DialogDescription>
						{selectedCommunities.length === 0 ? (
							<>Выбрать до 30 сообществ</>
						) : (
							<>Выбрано {selectedCommunities.length} сообществ</>
						)}
					</DialogDescription>
				</DialogHeader>
				<div className=''>
					<div className='command-container'>
						<div className='flex gap-2'>
							<Input
								type='text'
								placeholder='Поиск сообществ...'
								className='h-10 w-full px-2 rounded-md bg-secondary'
								value={searchTerm}
								onChange={e => setSearchTerm(e.target.value)}
							/>
						</div>
						<div className='mt-2 p-1 rounded-md'>
							{filteredCommunities.length === 0 ? (
								<div className='p-2 text-gray-500'>Участники не найдены</div>
							) : (
								<div className='flex flex-col gap-2 w-full h-[40vh] overflow-auto'>
									{filteredCommunities.map(item => {
										const community = item as CommunityWithDetails
										return (
											<div
												key={item.id}
												className='flex items-center gap-2 w-full px-2 py-1 cursor-pointer rounded-md bg-secondary hover:bg-gray-800'
												onClick={() =>
													handleCheckboxChange(
														community.id,
														!selectedCommunities.includes(community.id)
													)
												}
											>
												<Checkbox
													checked={selectedCommunities.includes(community.id)}
													onClick={event => event.stopPropagation()}
													onCheckedChange={checked =>
														handleCheckboxChange(
															community.id,
															checked as boolean
														)
													}
													disabled={
														selectedCommunities.length >= 30 &&
														!selectedCommunities.includes(community.id)
													}
												/>
												<div className='flex justify-items-start items-center gap-2 bg-transparent text-primary'>
													<Avatar className='rounded-full'>
														<AvatarImage
															className='m-auto rounded-full'
															src={community.logo?.url}
															style={{ width: 34, height: 34 }}
														/>
														<AvatarFallback>
															<CircleUser />
														</AvatarFallback>
													</Avatar>
													<span>{community.title}</span>
												</div>
											</div>
										)
									})}
								</div>
							)}
						</div>
					</div>
				</div>
				<DialogFooter className='flex items-center gap-4 justify-items-end pb-2'>
					<Button variant='blue' onClick={handleClose} className='px-10'>
						Отмена
					</Button>
					<Button
						variant='blue'
						onClick={handleBanSelectedCommunities}
						disabled={selectedCommunities.length === 0}
						className='px-6'
					>
						Заблокировать
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
