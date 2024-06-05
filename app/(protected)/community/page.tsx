import { db } from "@/lib/(auth)/db"
import { ModeToggle } from '@/components/mode-toggle'
import { UserButton } from "@/components/auth/user-button";
import { redirect } from 'next/navigation'
import { currentUser } from '@/lib/(auth)/auth'

const ServerPage = async () => {
	
	const user = await currentUser();
	
	const server = await db.server.findFirst({
		where: {
			members: {
				some: {
					userId: user?.id
				}
			}
		}
	})
	
	if (server) {
		return redirect(`/servers/${server.id}`);
	}
	
	return (
		<>
			<UserButton />
			<ModeToggle />
		</>
	);
};

export default ServerPage;
