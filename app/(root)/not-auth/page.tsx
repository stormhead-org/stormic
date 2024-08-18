import { InfoBlock } from '@/shared/components'

export default function UnauthorizedPage() {
	return (
		<div className='flex flex-col items-center justify-center mt-40'>
			<InfoBlock
				title='Упс. Сначала авторизуйтесь'
				text='Данную страницу могут просматривать только авторизованные пользователи'
				imageUrl='/assets/images/lock.png'
			/>
		</div>
	)
}
