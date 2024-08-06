import { Container, LeftSideBar, Title } from '@/shared/components/'
import LeftNavBar from '@/shared/components/left-nav-bar'

export default async function Home() {
	return (
		<>
			<Container className='mt-4'>
				<div className='flex gap-4'>
					{/* Левая часть */}
					<div className='w-[300px]'>
						<LeftSideBar />
						<LeftNavBar />
					</div>

					{/* Центральная часть */}
					<div className='flex-1 bg-blue-800'>Контент</div>

					{/* Правая часть */}
					<div className='w-[300px] bg-red-800'>
						<Title
							text='Сейчас обсуждают'
							size='sm'
							className='font-extrabold'
						/>
						<p>Комментарии</p>
					</div>
				</div>
			</Container>
		</>
	)
}
