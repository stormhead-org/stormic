'use client'

import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover'

import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

import { Smile } from 'lucide-react'
import { useTheme } from 'next-themes'

interface EmojiPickerProps {
	onChange: (value: string) => void
}

export const EmojiPicker = ({ onChange }: EmojiPickerProps) => {
	const { resolvedTheme } = useTheme()
	
	return (
		<>
			<Popover>
				<PopoverTrigger>
					<Smile className='text-zinc-400 hover:text-blue-700 transition' />
				</PopoverTrigger>
				
				<PopoverContent
					side='right'
					sideOffset={40}
					className='bg-transparent border-none shadow-none drop-shadow-none mb-16'
				>
					<Picker
						theme={resolvedTheme}
						data={data}
						onEmojiSelect={(emoji: any) => onChange(emoji.native)}
					/>
				</PopoverContent>
			</Popover>
		</>
	)
}
