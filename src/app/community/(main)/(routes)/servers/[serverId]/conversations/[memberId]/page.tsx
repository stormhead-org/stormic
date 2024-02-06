import { ChatHeader } from '@/components/(community)/chat/chat-header'
import { ChatInput } from '@/components/(community)/chat/chat-input'
import { ChatMessages } from '@/components/(community)/chat/chat-messages'
import { MediaRoom } from '@/components/media-room'
import { getOrCreateConversation } from '@/lib/(community)/conversation'
import { currentProfile } from '@/lib/(profile)/current-profile'
import { db } from '@/lib/db'
import { redirectToSignIn } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

interface MemberIdPageProps {
	params: {
		memberId: string
		serverId: string
	}
	searchParams: {
		video?: boolean
	}
}

const MemberIdPage = async ({ params, searchParams }: MemberIdPageProps) => {
	const profile = await currentProfile()

	if (!profile) {
		return redirectToSignIn()
	}

	const currentMember = await db.member.findFirst({
		where: {
			serverId: params.serverId,
			profileId: profile.id,
		},
		include: {
			profile: true,
		},
	})

	if (!currentMember) {
		return redirect('/community')
	}

	const conversation = await getOrCreateConversation(
		currentMember.id,
		params.memberId
	)

	if (!conversation) {
		return redirect(`/community/servers/${params.serverId}`)
	}

	const { memberOne, memberTwo } = conversation

	const otherMember = memberOne.profileId === profile.id ? memberTwo : memberOne

	return (
		<>
			<div className='bg-white dark:bg-card flex flex-col h-full'>
				<ChatHeader
					imageUrl={otherMember.profile.imageUrl}
					name={otherMember.profile.name}
					serverId={params.serverId}
					type='conversation'
				/>
				{searchParams.video && (
					<MediaRoom chatId={conversation.id} video={true} audio={true} />
				)}
				{!searchParams.video && (
					<>
						<ChatMessages
							member={currentMember}
							name={otherMember.profile.name}
							chatId={conversation.id}
							type='conversation'
							apiUrl='/api/direct-messages'
							paramKey='conversationId'
							paramValue={conversation.id}
							socketUrl='/api/socket/(community)/direct-messages'
							socketQuery={{
								conversationId: conversation.id,
							}}
						/>
						<ChatInput
							name={otherMember.profile.name}
							type='conversation'
							apiUrl='/api/socket/(community)/direct-messages'
							query={{
								conversationId: conversation.id,
							}}
						/>
					</>
				)}
			</div>
		</>
	)
}

export default MemberIdPage
