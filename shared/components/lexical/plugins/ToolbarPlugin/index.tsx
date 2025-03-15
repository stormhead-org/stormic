/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 * Licensed under the MIT license (see LICENSE file).
 */

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/shared/components/ui/select'
import { Toggle } from '@/shared/components/ui/toggle'
import {
	ToggleGroup,
	ToggleGroupItem
} from '@/shared/components/ui/toggle-group'
import {
	$isCodeNode,
	CODE_LANGUAGE_FRIENDLY_NAME_MAP,
	CODE_LANGUAGE_MAP,
	getLanguageFriendlyName
} from '@lexical/code'
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link'
import { $isListNode, ListNode } from '@lexical/list'
import { INSERT_EMBED_COMMAND } from '@lexical/react/LexicalAutoEmbedPlugin'
import { INSERT_HORIZONTAL_RULE_COMMAND } from '@lexical/react/LexicalHorizontalRuleNode'
import { $isHeadingNode } from '@lexical/rich-text'
import {
	$getSelectionStyleValueForProperty,
	$isParentElementRTL,
	$patchStyleText
} from '@lexical/selection'
import { $isTableNode, $isTableSelection } from '@lexical/table'
import {
	$findMatchingParent,
	$getNearestNodeOfType,
	$isEditorIsNestedEditor,
	mergeRegister
} from '@lexical/utils'
import {
	$getNodeByKey,
	$getSelection,
	$isElementNode,
	$isRangeSelection,
	$isRootOrShadowRoot,
	CAN_REDO_COMMAND,
	CAN_UNDO_COMMAND,
	COMMAND_PRIORITY_CRITICAL,
	ElementFormatType,
	FORMAT_ELEMENT_COMMAND,
	FORMAT_TEXT_COMMAND,
	INDENT_CONTENT_COMMAND,
	LexicalEditor,
	NodeKey,
	OUTDENT_CONTENT_COMMAND,
	REDO_COMMAND,
	SELECTION_CHANGE_COMMAND,
	TextFormatType,
	UNDO_COMMAND
} from 'lexical'
import {
	AlignCenter,
	AlignEndVertical,
	AlignJustify,
	AlignLeft,
	AlignRight,
	AlignStartVertical,
	ArrowBigUpDash,
	Bold,
	CaseLower,
	CaseUpper,
	Circle,
	CircleX,
	Code,
	Columns2,
	Heading1,
	Heading2,
	Heading3,
	Highlighter,
	Image,
	ImagePlay,
	IndentDecrease,
	IndentIncrease,
	Italic,
	Link,
	ListChecks,
	ListOrdered,
	Quote,
	RotateCcw,
	RotateCw,
	Rows2,
	Strikethrough,
	Subscript,
	Superscript,
	Underline,
	Vote,
	WrapText
} from 'lucide-react'
import type { JSX } from 'react'
import { Dispatch, useCallback, useEffect, useState } from 'react'
import {
	blockTypeToBlockName,
	useToolbarState
} from '../../context/ToolbarContext'
import useModal from '../../hooks/useModal'
import DropDown, { DropDownItem } from '../../ui/DropDown'
import { getSelectedNode } from '../../utils/getSelectedNode'
import { sanitizeUrl } from '../../utils/url'
import { EmbedConfigs } from '../AutoEmbedPlugin'
import {
	INSERT_IMAGE_COMMAND,
	InsertImageDialog,
	InsertImagePayload
} from '../ImagesPlugin'
import { InsertInlineImageDialog } from '../InlineImagePlugin'
import InsertLayoutDialog from '../LayoutPlugin/InsertLayoutDialog'
import { InsertPollDialog } from '../PollPlugin'
import {
	clearFormatting,
	formatBulletList,
	formatCheckList,
	formatCode,
	formatHeading,
	formatNumberedList,
	formatParagraph,
	formatQuote
} from './utils'

const CODE_LANGUAGE_OPTIONS = Object.entries(
	CODE_LANGUAGE_FRIENDLY_NAME_MAP
).map(([lang, name]) => [lang, name] as [string, string])

const ELEMENT_FORMAT_OPTIONS: Record<
	Exclude<ElementFormatType, ''>,
	{ icon: string; iconRTL: string; name: string }
> = {
	center: {
		icon: 'center-align',
		iconRTL: 'center-align',
		name: 'Center Align'
	},
	end: { icon: 'right-align', iconRTL: 'left-align', name: 'End Align' },
	justify: {
		icon: 'justify-align',
		iconRTL: 'justify-align',
		name: 'Justify Align'
	},
	left: { icon: 'left-align', iconRTL: 'left-align', name: 'Left Align' },
	right: { icon: 'right-align', iconRTL: 'right-align', name: 'Right Align' },
	start: { icon: 'left-align', iconRTL: 'right-align', name: 'Start Align' }
}

function dropDownActiveClass(active: boolean) {
	return active ? 'active dropdown-item-active' : ''
}

function BlockFormatDropDown({
	editor,
	blockType,
	disabled = false
}: {
	blockType: keyof typeof blockTypeToBlockName
	editor: LexicalEditor
	disabled?: boolean
}): JSX.Element {
	const handleBlockFormat = (value: string) => {
		const actions: Record<string, () => void> = {
			paragraph: () => formatParagraph(editor),
			h1: () => formatHeading(editor, blockType, 'h1'),
			h2: () => formatHeading(editor, blockType, 'h2'),
			h3: () => formatHeading(editor, blockType, 'h3'),
			bullet: () => formatBulletList(editor, blockType),
			number: () => formatNumberedList(editor, blockType),
			check: () => formatCheckList(editor, blockType),
			quote: () => formatQuote(editor, blockType),
			code: () => formatCode(editor, blockType)
		}
		actions[value]?.()
	}

	return (
		<Select disabled={disabled} onValueChange={handleBlockFormat}>
			<SelectTrigger
				className={`toolbar-item block-controls icon block-type ${blockType}`}
			>
				<SelectValue placeholder={blockTypeToBlockName[blockType]} />
			</SelectTrigger>
			<SelectContent>
				{[
					{ value: 'paragraph', icon: WrapText, label: 'Normal' },
					{ value: 'h1', icon: Heading1, label: 'Heading 1' },
					{ value: 'h2', icon: Heading2, label: 'Heading 2' },
					{ value: 'h3', icon: Heading3, label: 'Heading 3' },
					{ value: 'bullet', icon: Circle, label: 'Bullet List' },
					{ value: 'number', icon: ListOrdered, label: 'Numbered List' },
					{ value: 'check', icon: ListChecks, label: 'Check List' },
					{ value: 'quote', icon: Quote, label: 'Quote' },
					{ value: 'code', icon: Code, label: 'Code Block' }
				].map(({ value, icon: Icon, label }) => (
					<SelectItem key={value} value={value}>
						<div className='flex items-center'>
							<Icon size={16} />
							<span className='ml-2'>{label}</span>
						</div>
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}

function Divider(): JSX.Element {
	return <div className='w-px bg-gray-200 mx-1' />
}

function ElementFormatDropdown({
	editor,
	value,
	isRTL,
	disabled = false
}: {
	editor: LexicalEditor
	value: ElementFormatType
	isRTL: boolean
	disabled: boolean
}): JSX.Element {
	const formatOption = ELEMENT_FORMAT_OPTIONS[value || 'left']

	const handleFormat = (val: string) => {
		const actions: Record<string, () => void> = {
			left: () => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left'),
			center: () => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center'),
			right: () => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right'),
			justify: () => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify'),
			start: () => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'start'),
			end: () => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'end'),
			outdent: () => editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined),
			indent: () => editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined)
		}
		actions[val]?.()
	}

	return (
		<Select disabled={disabled} onValueChange={handleFormat}>
			<SelectTrigger
				className={`toolbar-item spaced alignment ${isRTL ? formatOption.iconRTL : formatOption.icon}`}
			>
				<SelectValue placeholder={formatOption.name} />
			</SelectTrigger>
			<SelectContent>
				{[
					{ value: 'left', icon: AlignLeft, label: 'Left Align' },
					{ value: 'center', icon: AlignCenter, label: 'Center Align' },
					{ value: 'right', icon: AlignRight, label: 'Right Align' },
					{ value: 'justify', icon: AlignJustify, label: 'Justify Align' },
					{ value: 'start', icon: AlignStartVertical, label: 'Start Align' },
					{ value: 'end', icon: AlignEndVertical, label: 'End Align' },
					{ value: 'outdent', icon: IndentDecrease, label: 'Outdent' },
					{ value: 'indent', icon: IndentIncrease, label: 'Indent' }
				].map(({ value, icon: Icon, label }) => (
					<SelectItem key={value} value={value}>
						<div className='flex items-center'>
							<Icon size={16} />
							<span className='ml-2'>{label}</span>
						</div>
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}

export default function ToolbarPlugin({
	editor,
	activeEditor,
	setActiveEditor,
	setIsLinkEditMode
}: {
	editor: LexicalEditor
	activeEditor: LexicalEditor
	setActiveEditor: Dispatch<LexicalEditor>
	setIsLinkEditMode: Dispatch<boolean>
}): JSX.Element {
	const [selectedElementKey, setSelectedElementKey] = useState<NodeKey | null>(
		null
	)
	const [modal, showModal] = useModal()
	const [isEditable, setIsEditable] = useState(() => editor.isEditable())
	const { toolbarState, updateToolbarState } = useToolbarState()

	const $updateToolbar = useCallback(() => {
		const selection = $getSelection()
		if ($isRangeSelection(selection)) {
			updateToolbarState(
				'isImageCaption',
				activeEditor !== editor && $isEditorIsNestedEditor(activeEditor)
					? !!activeEditor
							.getRootElement()
							?.parentElement?.classList.contains('image-caption-container')
					: false
			)

			const anchorNode = selection.anchor.getNode()
			let element =
				anchorNode.getKey() === 'root'
					? anchorNode
					: $findMatchingParent(anchorNode, e => {
							const parent = e.getParent()
							return parent !== null && $isRootOrShadowRoot(parent)
						}) || anchorNode.getTopLevelElementOrThrow()

			const elementKey = element.getKey()
			const elementDOM = activeEditor.getElementByKey(elementKey)

			updateToolbarState('isRTL', $isParentElementRTL(selection))
			const node = getSelectedNode(selection)
			const parent = node.getParent()
			updateToolbarState('isLink', $isLinkNode(parent) || $isLinkNode(node))
			updateToolbarState(
				'rootType',
				$isTableNode($findMatchingParent(node, $isTableNode)) ? 'table' : 'root'
			)

			if (elementDOM) {
				setSelectedElementKey(elementKey)
				if ($isListNode(element)) {
					const parentList = $getNearestNodeOfType<ListNode>(
						anchorNode,
						ListNode
					)
					updateToolbarState(
						'blockType',
						parentList?.getListType() || element.getListType()
					)
				} else {
					const type = $isHeadingNode(element)
						? element.getTag()
						: element.getType()
					if (type in blockTypeToBlockName)
						updateToolbarState(
							'blockType',
							type as keyof typeof blockTypeToBlockName
						)
					if ($isCodeNode(element)) {
						const language =
							element.getLanguage() as keyof typeof CODE_LANGUAGE_MAP
						updateToolbarState(
							'codeLanguage',
							language ? CODE_LANGUAGE_MAP[language] || language : ''
						)
						return
					}
				}
			}

			updateToolbarState(
				'fontColor',
				$getSelectionStyleValueForProperty(selection, 'color', '#000')
			)
			updateToolbarState(
				'bgColor',
				$getSelectionStyleValueForProperty(
					selection,
					'background-color',
					'#fff'
				)
			)
			updateToolbarState(
				'fontFamily',
				$getSelectionStyleValueForProperty(selection, 'font-family', 'Arial')
			)

			const matchingParent = $isLinkNode(parent)
				? $findMatchingParent(node, n => $isElementNode(n) && !n.isInline())
				: null
			updateToolbarState(
				'elementFormat',
				matchingParent && $isElementNode(matchingParent)
					? matchingParent.getFormatType()
					: $isElementNode(node)
						? node.getFormatType()
						: parent?.getFormatType() || 'left'
			)
		}

		if ($isRangeSelection(selection) || $isTableSelection(selection)) {
			updateToolbarState('isBold', selection.hasFormat('bold'))
			updateToolbarState('isItalic', selection.hasFormat('italic'))
			updateToolbarState('isUnderline', selection.hasFormat('underline'))
			updateToolbarState(
				'isStrikethrough',
				selection.hasFormat('strikethrough')
			)
			updateToolbarState('isSubscript', selection.hasFormat('subscript'))
			updateToolbarState('isSuperscript', selection.hasFormat('superscript'))
			updateToolbarState('isHighlight', selection.hasFormat('highlight'))
			updateToolbarState('isCode', selection.hasFormat('code'))
			if ($isRangeSelection(selection)) {
				updateToolbarState(
					'fontSize',
					$getSelectionStyleValueForProperty(selection, 'font-size', '15px')
				)
			} else {
				updateToolbarState('fontSize', '15px')
			}
			updateToolbarState('isLowercase', selection.hasFormat('lowercase'))
			updateToolbarState('isUppercase', selection.hasFormat('uppercase'))
			updateToolbarState('isCapitalize', selection.hasFormat('capitalize'))
		}
	}, [activeEditor, editor, updateToolbarState])

	useEffect(() => {
		return editor.registerCommand(
			SELECTION_CHANGE_COMMAND,
			(_payload, newEditor) => {
				setActiveEditor(newEditor)
				$updateToolbar()
				return false
			},
			COMMAND_PRIORITY_CRITICAL
		)
	}, [editor, $updateToolbar, setActiveEditor])

	useEffect(() => {
		activeEditor.getEditorState().read($updateToolbar)
	}, [activeEditor, $updateToolbar])

	useEffect(() => {
		return mergeRegister(
			editor.registerEditableListener(setIsEditable),
			activeEditor.registerUpdateListener(({ editorState }) =>
				editorState.read($updateToolbar)
			),
			activeEditor.registerCommand(
				CAN_UNDO_COMMAND,
				payload => {
					updateToolbarState('canUndo', payload)
					return false
				},
				COMMAND_PRIORITY_CRITICAL
			),
			activeEditor.registerCommand(
				CAN_REDO_COMMAND,
				payload => {
					updateToolbarState('canRedo', payload)
					return false
				},
				COMMAND_PRIORITY_CRITICAL
			)
		)
	}, [$updateToolbar, activeEditor, editor, updateToolbarState])

	const applyStyleText = useCallback(
		(styles: Record<string, string>, skipHistoryStack?: boolean) => {
			activeEditor.update(
				() => {
					const selection = $getSelection()
					if (selection) $patchStyleText(selection, styles)
				},
				skipHistoryStack ? { tag: 'historic' } : {}
			)
		},
		[activeEditor]
	)

	const insertLink = useCallback(() => {
		setIsLinkEditMode(!toolbarState.isLink)
		activeEditor.dispatchCommand(
			TOGGLE_LINK_COMMAND,
			toolbarState.isLink ? null : sanitizeUrl('https://')
		)
	}, [activeEditor, setIsLinkEditMode, toolbarState.isLink])

	const onCodeLanguageSelect = useCallback(
		(value: string) => {
			activeEditor.update(() => {
				if (selectedElementKey) {
					const node = $getNodeByKey(selectedElementKey)
					if ($isCodeNode(node)) node.setLanguage(value)
				}
			})
		},
		[activeEditor, selectedElementKey]
	)

	const insertGifOnClick = (payload: InsertImagePayload) =>
		activeEditor.dispatchCommand(INSERT_IMAGE_COMMAND, payload)

	const canViewerSeeInsertControls = !toolbarState.isImageCaption

	return (
		<div className='flex mb-px bg-white p-1 rounded-t-xl overflow-auto h-9 sticky top-0 z-2 overflow-y-hidden'>
			<button
				disabled={!toolbarState.canUndo || !isEditable}
				onClick={() => activeEditor.dispatchCommand(UNDO_COMMAND, undefined)}
				title='Undo (Ctrl+Z)'
				type='button'
				className='toolbar-item spaced'
				aria-label='Undo'
			>
				<RotateCcw size={16} />
			</button>
			<button
				disabled={!toolbarState.canRedo || !isEditable}
				onClick={() => activeEditor.dispatchCommand(REDO_COMMAND, undefined)}
				title='Redo (Ctrl+Y)'
				type='button'
				className='toolbar-item'
				aria-label='Redo'
			>
				<RotateCw size={16} />
			</button>
			<Divider />
			{toolbarState.blockType in blockTypeToBlockName &&
				activeEditor === editor && (
					<>
						<BlockFormatDropDown
							disabled={!isEditable}
							blockType={toolbarState.blockType}
							editor={activeEditor}
						/>
						<Divider />
					</>
				)}
			{toolbarState.blockType === 'code' ? (
				<DropDown
					disabled={!isEditable}
					buttonClassName='toolbar-item code-language'
					buttonLabel={getLanguageFriendlyName(toolbarState.codeLanguage)}
					buttonAriaLabel='Select language'
				>
					{CODE_LANGUAGE_OPTIONS.map(([value, name]) => (
						<DropDownItem
							key={value}
							className={`item ${dropDownActiveClass(value === toolbarState.codeLanguage)}`}
							onClick={() => onCodeLanguageSelect(value)}
						>
							<span className='text'>{name}</span>
						</DropDownItem>
					))}
				</DropDown>
			) : (
				<>
					{/* <Divider />
					<FontSize
						selectionFontSize={toolbarState.fontSize.slice(0, -2)}
						editor={activeEditor}
						disabled={!isEditable}
					/> */}
					<Divider />
					<ToggleGroup type='multiple' variant='outline'>
						{[
							{ value: 'bold', icon: Bold },
							{ value: 'italic', icon: Italic },
							{ value: 'underline', icon: Underline }
						].map(({ value, icon: Icon }) => (
							<ToggleGroupItem
								key={value}
								disabled={!isEditable}
								value={value}
								aria-label={`Toggle ${value}`}
								onClick={() =>
									activeEditor.dispatchCommand(
										FORMAT_TEXT_COMMAND,
										value as TextFormatType
									)
								}
							>
								<Icon size={16} />
							</ToggleGroupItem>
						))}
					</ToggleGroup>
					{canViewerSeeInsertControls && (
						<Toggle
							disabled={!isEditable}
							aria-label='Toggle code'
							onClick={() =>
								activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code')
							}
						>
							<Code size={16} />
						</Toggle>
					)}
					<button
						disabled={!isEditable}
						onClick={insertLink}
						className={`toolbar-item spaced ${toolbarState.isLink ? 'active' : ''}`}
						aria-label='Insert link'
						title='Insert link'
						type='button'
					>
						<Link size={16} />
					</button>
					<Select
						disabled={!isEditable}
						onValueChange={value => {
							const actions: Record<string, () => void> = {
								lowercase: () =>
									activeEditor.dispatchCommand(
										FORMAT_TEXT_COMMAND,
										'lowercase'
									),
								uppercase: () =>
									activeEditor.dispatchCommand(
										FORMAT_TEXT_COMMAND,
										'uppercase'
									),
								capitalize: () =>
									activeEditor.dispatchCommand(
										FORMAT_TEXT_COMMAND,
										'capitalize'
									),
								strikethrough: () =>
									activeEditor.dispatchCommand(
										FORMAT_TEXT_COMMAND,
										'strikethrough'
									),
								subscript: () =>
									activeEditor.dispatchCommand(
										FORMAT_TEXT_COMMAND,
										'subscript'
									),
								superscript: () =>
									activeEditor.dispatchCommand(
										FORMAT_TEXT_COMMAND,
										'superscript'
									),
								highlight: () =>
									activeEditor.dispatchCommand(
										FORMAT_TEXT_COMMAND,
										'highlight'
									),
								clearing: () => clearFormatting(activeEditor)
							}
							actions[value]?.()
						}}
					>
						<SelectTrigger className='w-[180px]'>
							<SelectValue placeholder='Форматирование' />
						</SelectTrigger>
						<SelectContent>
							{[
								{ value: 'lowercase', icon: CaseLower, label: 'Lowercase' },
								{ value: 'uppercase', icon: CaseUpper, label: 'Uppercase' },
								{
									value: 'capitalize',
									icon: ArrowBigUpDash,
									label: 'Capitalize'
								},
								{
									value: 'strikethrough',
									icon: Strikethrough,
									label: 'Strikethrough'
								},
								{ value: 'subscript', icon: Subscript, label: 'Subscript' },
								{
									value: 'superscript',
									icon: Superscript,
									label: 'Superscript'
								},
								{ value: 'highlight', icon: Highlighter, label: 'Highlight' },
								{ value: 'clearing', icon: CircleX, label: 'Clear Formatting' }
							].map(({ value, icon: Icon, label }) => (
								<SelectItem key={value} value={value}>
									<div className='flex'>
										<Icon size={16} />
										<span>{label}</span>
									</div>
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					{canViewerSeeInsertControls && (
						<>
							<Divider />
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
								<SelectTrigger className='toolbar-item spaced w-[180px]'>
									<SelectValue placeholder='Insert' />
								</SelectTrigger>
								<SelectContent>
									{[
										{
											value: 'horizontal-rule',
											icon: Rows2,
											label: 'Horizontal Rule'
										},
										{ value: 'image', icon: Image, label: 'Image' },
										{
											value: 'inline-image',
											icon: Image,
											label: 'Inline Image'
										},
										{ value: 'gif', icon: ImagePlay, label: 'GIF' },
										{ value: 'poll', icon: Vote, label: 'Poll' },
										{
											value: 'columns-layout',
											icon: Columns2,
											label: 'Columns Layout'
										}
									].map(({ value, icon: Icon, label }) => (
										<SelectItem key={value} value={value}>
											<div className='flex items-center'>
												<Icon size={16} />
												<span className='ml-2'>{label}</span>
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
						</>
					)}
				</>
			)}
			<Divider />
			<ElementFormatDropdown
				disabled={!isEditable}
				value={toolbarState.elementFormat}
				editor={activeEditor}
				isRTL={toolbarState.isRTL}
			/>
			{modal}
		</div>
	)
}
