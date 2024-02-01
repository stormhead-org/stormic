import { ServerList } from '@/components/(community)/server/server-list'
import { ScrollArea } from '@/components/ui/scroll-area'
import { initialProfile } from '@/lib/(profile)/initial-profile'
import { db } from '@/lib/db'

const WelcomeCommunityPage = async () => {
	const profile = await initialProfile()
	const server = await db.server.findFirst({
		where: {
			members: {
				some: {
					profileId: profile.id,
				},
			},
		},
	})

	// if (server) {
	// 	return redirect(`/community/servers/${server.id}`)
	// }
	// return <InitialModal />
	const servers = await db.server.findMany()
	return (
		<>
			<div className=''>
				<ScrollArea className='flex-1 w-full'>
					{servers.map(server => (
						<div key={server.id} className='mb-4'>
							<ServerList
								id={server.id}
								name={server.name}
								imageUrl={server.imageUrl}
							/>
						</div>
					))}
				</ScrollArea>
			</div>
		</>
	)
}

export default WelcomeCommunityPage
