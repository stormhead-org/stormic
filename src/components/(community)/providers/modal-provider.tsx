'use client'

import { CreateChannelModal } from '@/components/(community)/modals/create-channel-modal'
import { CreateServerModal } from '@/components/(community)/modals/create-server-modal'
import { DeleteChannelModal } from '@/components/(community)/modals/delete-channel-modal'
import { DeleteMessageModal } from '@/components/(community)/modals/delete-message-modal'
import { DeleteServerModal } from '@/components/(community)/modals/delete-server-modal'
import { EditChannelModal } from '@/components/(community)/modals/edit-channel-modal'
import { EditServerModal } from '@/components/(community)/modals/edit-server-modal'
import { InviteModal } from '@/components/(community)/modals/invite-modal'
import { LeaveServerModal } from '@/components/(community)/modals/leave-server-modal'
import { MembersModal } from '@/components/(community)/modals/members-modal'
import { MessageFileModal } from '@/components/(community)/modals/message-file-modal'
import { useEffect, useState } from 'react'

export const ModalProvider = () => {
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		setIsMounted(true)
	}, [])

	if (!isMounted) {
		return null
	}

	return (
		<>
			<CreateServerModal />
			<InviteModal />
			<EditServerModal />
			<MembersModal />
			<CreateChannelModal />
			<LeaveServerModal />
			<DeleteServerModal />
			<DeleteChannelModal />
			<EditChannelModal />
			<MessageFileModal />
			<DeleteMessageModal />
		</>
	)
}
