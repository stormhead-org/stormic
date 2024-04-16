import { Hash } from 'lucide-react'

interface ChatWelcomeProps {
	name: string
	type: 'channel' | 'conversation'
}

export const ChatWelcome = ({ name, type }: ChatWelcomeProps) => {
	return (
		<>
			<div className='space-y-2 px-4 mb-4'>
				{type === 'channel' && (
					<div className='h-[75px] w-[75px] rounded-full bg-zinc-500 dark:bg-bgColorUiItem/60 flex items-center justify-center'>
						<Hash className='h-12 w-12 text-white' />
					</div>
				)}
				<p className='text-xl md:text-3xl font-bold'>
					{type === 'channel' ? 'Добро пожаловать в #' : ''}
					{name}
				</p>
				<p className='text-zinc-600 dark:text-zinc-400 text-sm'>
					{type === 'channel'
						? `Это самое начало пути #${name}`
						: `Это начало вашего общения с ${name}`}
				</p>
			</div>
		</>
	)
}
