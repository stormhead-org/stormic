import { ServerMember } from '@/components/(community)/server/server-member'
import { ServerSearch } from '@/components/(community)/server/server-search'
import { ServerSection } from '@/components/(community)/server/server-section'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { currentProfile } from '@/lib/(profile)/current-profile'
import { db } from '@/lib/db'
import { ChannelType, MemberRole } from '@prisma/client'
import { Crown, Hash, Mic, ShieldCheck, Video } from 'lucide-react'
import { redirect } from 'next/navigation'

interface ServerSidebarProps {
	serverId: string
}

const iconMap = {
	[ChannelType.TEXT]: <Hash className='mr-2 w-4 h-4' />,
	[ChannelType.AUDIO]: <Mic className='mr-2 w-4 h-4' />,
	[ChannelType.VIDEO]: <Video className='mr-2 w-4 h-4' />,
}

const roleIconMap = {
	[MemberRole.GUEST]: null,
	[MemberRole.MODERATOR]: (
		<ShieldCheck className='h-4 w-4 mr-2 text-indigo-500' />
	),
	[MemberRole.ADMIN]: <Crown className='h-4 w-4 mr-2 text-rose-500' />,
}

export const ServerSidebarM = async ({ serverId }: ServerSidebarProps) => {
	const profile = await currentProfile()

	if (!profile) {
		return redirect('/community')
	}

	const server = await db.server.findUnique({
		where: {
			id: serverId,
		},
		include: {
			channels: {
				orderBy: {
					createdAt: 'asc',
				},
			},
			members: {
				include: {
					profile: true,
				},
				orderBy: {
					role: 'asc',
				},
			},
		},
	})

	const textChannels = server?.channels.filter(
		channel => channel.type === ChannelType.TEXT
	)
	const audioChannels = server?.channels.filter(
		channel => channel.type === ChannelType.AUDIO
	)
	const videoChannels = server?.channels.filter(
		channel => channel.type === ChannelType.VIDEO
	)
	const members = server?.members.filter(
		member => member.profileId !== profile.id
	)

	if (!server) {
		return redirect('/community')
	}

	const role = server.members.find(
		member => member.profileId === profile.id
	)?.role

	return (
		<>
			<div className='flex flex-col h-full text-primary w-full dark:bg-card bg-[#F2F3F5]'>
				<ScrollArea className='flex-1 px-3'>
					<div className='mt-2'>
						<ServerSearch
							data={[
								{
									label: 'Текстовые каналы',
									type: 'channel',
									data: textChannels?.map(channel => ({
										id: channel.id,
										name: channel.name,
										icon: iconMap[channel.type],
									})),
								},
								{
									label: 'Голосовые каналы',
									type: 'channel',
									data: audioChannels?.map(channel => ({
										id: channel.id,
										name: channel.name,
										icon: iconMap[channel.type],
									})),
								},
								{
									label: 'Видео каналы',
									type: 'channel',
									data: videoChannels?.map(channel => ({
										id: channel.id,
										name: channel.name,
										icon: iconMap[channel.type],
									})),
								},
								{
									label: 'Участники',
									type: 'member',
									data: members?.map(member => ({
										id: member.id,
										name: member.profile.name,
										icon: roleIconMap[member.role],
									})),
								},
							]}
						/>
					</div>
					<Separator className='bg-zinc-200 rounded-md my-2' />
					{!!members?.length && (
						<div className='mb-2'>
							<ServerSection
								sectionType='members'
								role={role}
								label='Участники'
								server={server}
							/>
							<div className='space-y-[2px]'>
								{members.map(member => (
									<ServerMember
										key={member.id}
										member={member}
										server={server}
									/>
								))}
							</div>
						</div>
					)}
				</ScrollArea>
			</div>
		</>
	)
}
