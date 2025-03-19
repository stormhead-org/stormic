import { useToolbarState } from '@/shared/components/lexical/context/ToolbarContext'
import useModal from '@/shared/components/lexical/hooks/useModal'
import { EmbedConfigs } from '@/shared/components/lexical/plugins/AutoEmbedPlugin'
import {
	INSERT_IMAGE_COMMAND,
	InsertImageDialog,
	InsertImagePayload
} from '@/shared/components/lexical/plugins/ImagesPlugin'
import { InsertInlineImageDialog } from '@/shared/components/lexical/plugins/InlineImagePlugin'
import InsertLayoutDialog from '@/shared/components/lexical/plugins/LayoutPlugin/InsertLayoutDialog'
import { InsertPollDialog } from '@/shared/components/lexical/plugins/PollPlugin'
import { Button } from '@/shared/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select'
import { cn } from '@/shared/lib/utils'
import { INSERT_EMBED_COMMAND } from '@lexical/react/LexicalAutoEmbedPlugin'
import { INSERT_HORIZONTAL_RULE_COMMAND } from '@lexical/react/LexicalHorizontalRuleNode'
import { LexicalEditor, UNDO_COMMAND } from 'lexical'
import { Columns2, Image, ImagePlay, RotateCcw, Rows2, Vote } from 'lucide-react'
import React, { useState } from 'react'

interface Props {
	editor: LexicalEditor
	activeEditor: LexicalEditor
	className?: string
}

export const Insert: React.FC<Props> = ({ editor, activeEditor, className }) => {
	
	const [isEditable, setIsEditable] = useState(() => editor.isEditable())
	const [modal, showModal] = useModal()
	
	const insertGifOnClick = (payload: InsertImagePayload) =>
		activeEditor.dispatchCommand(INSERT_IMAGE_COMMAND, payload)
	
	return (
		<div className={cn(className, '')}>
			<Select
				disabled={!isEditable}
				onValueChange={value => {
					const actions: Record<string, () => void> = {
						'horizontal-rule': () =>
							activeEditor.dispatchCommand(
								INSERT_HORIZONTAL_RULE_COMMAND,
								undefined
							),
						image: () =>
							showModal('Insert Image', onClose => (
								<InsertImageDialog
									activeEditor={activeEditor}
									onClose={onClose}
								/>
							)),
						'inline-image': () =>
							showModal('Insert Inline Image', onClose => (
								<InsertInlineImageDialog
									activeEditor={activeEditor}
									onClose={onClose}
								/>
							)),
						gif: () =>
							insertGifOnClick({
								altText: 'Cat typing on a laptop',
								src: '../../images/cat-typing.gif'
							}),
						poll: () =>
							showModal('Insert Poll', onClose => (
								<InsertPollDialog
									activeEditor={activeEditor}
									onClose={onClose}
								/>
							)),
						'columns-layout': () =>
							showModal('Insert Columns Layout', onClose => (
								<InsertLayoutDialog
									activeEditor={activeEditor}
									onClose={onClose}
								/>
							))
					}
					if (actions[value]) actions[value]()
					else {
						const embedConfig = EmbedConfigs.find(
							config => config.type === value
						)
						if (embedConfig)
							activeEditor.dispatchCommand(
								INSERT_EMBED_COMMAND,
								embedConfig.type
							)
					}
				}}
			>
				<SelectTrigger>
					<SelectValue placeholder='Вставка' />
				</SelectTrigger>
				<SelectContent>
					{[
						{
							value: 'horizontal-rule',
							icon: Rows2,
							label: 'Разделитель'
						},
						{ value: 'image', icon: Image, label: 'Изображение' },
						{
							value: 'inline-image',
							icon: Image,
							label: 'Изображение в строку'
						},
						{ value: 'gif', icon: ImagePlay, label: 'GIF' },
						{ value: 'poll', icon: Vote, label: 'Опрос' },
						{
							value: 'columns-layout',
							icon: Columns2,
							label: 'Таблица'
						}
					].map(({ value, icon: Icon, label }) => (
						<SelectItem key={value} value={value}>
							<div className='flex items-center gap-2'>
								<Icon size={16} />
								{label}
							</div>
						</SelectItem>
					))}
					{EmbedConfigs.map(embedConfig => (
						<SelectItem key={embedConfig.type} value={embedConfig.type}>
							<div className='flex items-center'>
								{embedConfig.icon}
								<span className='ml-2'>{embedConfig.contentName}</span>
							</div>
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			{modal}
		</div>
	)
}
