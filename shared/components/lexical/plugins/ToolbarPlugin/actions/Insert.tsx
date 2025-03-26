import { EmbedConfigs } from '@/shared/components/lexical/plugins/AutoEmbedPlugin'
import {
	INSERT_IMAGE_COMMAND,
	InsertImageDialog,
	InsertImagePayload
} from '@/shared/components/lexical/plugins/ImagesPlugin'
// import { InsertInlineImageDialog } from '@/shared/components/lexical/plugins/InlineImagePlugin'
import InsertLayoutDialog from '@/shared/components/lexical/plugins/LayoutPlugin/InsertLayoutDialog'
// import { InsertPollDialog } from '@/shared/components/lexical/plugins/PollPlugin'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle
} from '@/shared/components/ui/dialog'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/shared/components/ui/select'
import { cn } from '@/shared/lib/utils'
import { INSERT_EMBED_COMMAND } from '@lexical/react/LexicalAutoEmbedPlugin'
import { INSERT_HORIZONTAL_RULE_COMMAND } from '@lexical/react/LexicalHorizontalRuleNode'
import { LexicalEditor } from 'lexical'
import { Columns2, Image, ImagePlay, Rows2, Vote } from 'lucide-react'
import React, { useState } from 'react'

interface Props {
	editor: LexicalEditor
	activeEditor: LexicalEditor
	className?: string
}

export const Insert: React.FC<Props> = ({
	editor,
	activeEditor,
	className
}) => {
	const [isEditable, setIsEditable] = useState(() => editor.isEditable())
	const [dialogType, setDialogType] = useState<string | null>(null)
	const [isDialogOpen, setIsDialogOpen] = useState(false)

	const insertGifOnClick = (payload: InsertImagePayload) =>
		activeEditor.dispatchCommand(INSERT_IMAGE_COMMAND, payload)

	const handleSelectChange = (value: string) => {
		const actions: Record<string, () => void> = {
			'horizontal-rule': () =>
				activeEditor.dispatchCommand(INSERT_HORIZONTAL_RULE_COMMAND, undefined),
			image: () => {
				setDialogType('image')
				setIsDialogOpen(true)
			},
			'inline-image': () => {
				setDialogType('inline-image')
				setIsDialogOpen(true)
			},
			gif: () =>
				insertGifOnClick({
					altText: 'Cat typing on a laptop',
					src: '../../images/cat-typing.gif'
				}),
			poll: () => {
				setDialogType('poll')
				setIsDialogOpen(true)
			},
			'columns-layout': () => {
				setDialogType('columns-layout')
				setIsDialogOpen(true)
			}
		}

		if (actions[value]) {
			actions[value]()
		} else {
			const embedConfig = EmbedConfigs.find(config => config.type === value)
			if (embedConfig) {
				activeEditor.dispatchCommand(INSERT_EMBED_COMMAND, embedConfig.type)
			}
		}
	}

	const renderDialogContent = () => {
		switch (dialogType) {
			case 'image':
				return (
					<InsertImageDialog
						activeEditor={activeEditor}
						onClose={() => setIsDialogOpen(false)}
					/>
				)
			// case 'inline-image':
			//   return (
			//     <InsertInlineImageDialog
			//       activeEditor={activeEditor}
			//       onClose={() => setIsDialogOpen(false)}
			//     />
			//   )
			// case 'poll':
			//   return (
			//     <InsertPollDialog
			//       activeEditor={activeEditor}
			//       onClose={() => setIsDialogOpen(false)}
			//     />
			//   )
			case 'columns-layout':
				return (
					<InsertLayoutDialog
						activeEditor={activeEditor}
						onClose={() => setIsDialogOpen(false)}
					/>
				)
			default:
				return null
		}
	}

	return (
		<div className={cn(className, '')}>
			<Select disabled={!isEditable} onValueChange={handleSelectChange}>
				<SelectTrigger className='bg-gray-600 hover:bg-gray-500 border-0'>
					<SelectValue placeholder='Вставка' />
				</SelectTrigger>
				<SelectContent className='mt-1'>
					{[
						{ value: 'horizontal-rule', icon: Rows2, label: 'Разделитель' },
						{ value: 'image', icon: Image, label: 'Изображение' },
						{
							value: 'inline-image',
							icon: Image,
							label: 'Изображение в строку'
						},
						{ value: 'gif', icon: ImagePlay, label: 'GIF' },
						{ value: 'poll', icon: Vote, label: 'Опрос' },
						{ value: 'columns-layout', icon: Columns2, label: 'Таблица' }
					].map(({ value, icon: Icon, label }) => (
						<SelectItem key={value} value={value}>
							<div className='flex items-center gap-2'>
								<Icon size={16} />
								{label}
							</div>
						</SelectItem>
					))}
					{EmbedConfigs.map(embedConfig => (
						<SelectItem
							key={embedConfig.type}
							value={embedConfig.type}
							className='cursor-pointer hover:bg-primary/10'
						>
							<div className='flex items-center'>
								{embedConfig.icon}
								<span className='ml-2'>{embedConfig.contentName}</span>
							</div>
						</SelectItem>
					))}
				</SelectContent>
			</Select>

			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>
							{dialogType === 'image' && 'Вставка изображения'}
							{dialogType === 'inline-image' && 'Вставка изображения в строку'}
							{dialogType === 'poll' && 'Вставка опроса'}
							{dialogType === 'columns-layout' && 'Вставка таблицы'}
						</DialogTitle>
					</DialogHeader>
					{renderDialogContent()}
				</DialogContent>
			</Dialog>
		</div>
	)
}
