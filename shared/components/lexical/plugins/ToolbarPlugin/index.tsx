/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 * Licensed under the MIT license (see LICENSE file).
 */

import { Insert } from '@/shared/components/lexical/plugins/ToolbarPlugin/actions/Insert'
import { InsertLink } from '@/shared/components/lexical/plugins/ToolbarPlugin/actions/InsertLink'
import { Redo } from '@/shared/components/lexical/plugins/ToolbarPlugin/actions/Redo'
import { TextAlign } from '@/shared/components/lexical/plugins/ToolbarPlugin/actions/TextAlign'
import { TextFormat } from '@/shared/components/lexical/plugins/ToolbarPlugin/actions/TextFormat'
import { TextType } from '@/shared/components/lexical/plugins/ToolbarPlugin/actions/TextType'
import { Toggles } from '@/shared/components/lexical/plugins/ToolbarPlugin/actions/Toggles'
import { Undo } from '@/shared/components/lexical/plugins/ToolbarPlugin/actions/Undo'
import {
	$isCodeNode,
	CODE_LANGUAGE_FRIENDLY_NAME_MAP,
	CODE_LANGUAGE_MAP
} from '@lexical/code'
import { $isLinkNode } from '@lexical/link'
import { $isListNode, ListNode } from '@lexical/list'
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
	LexicalEditor,
	NodeKey,
	SELECTION_CHANGE_COMMAND
} from 'lexical'
import type { JSX } from 'react'
import { Dispatch, useCallback, useEffect, useState } from 'react'
import {
	blockTypeToBlockName,
	useToolbarState
} from '../../context/ToolbarContext'
import useModal from '../../hooks/useModal'
import { getSelectedNode } from '../../utils/getSelectedNode'

const CODE_LANGUAGE_OPTIONS = Object.entries(
	CODE_LANGUAGE_FRIENDLY_NAME_MAP
).map(([lang, name]) => [lang, name] as [string, string])

function Divider(): JSX.Element {
	return <div className='w-[2px] bg-gray-600 mx-1' />
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
			// if ($isRangeSelection(selection)) {
			// 	updateToolbarState(
			// 		'fontSize',
			// 		$getSelectionStyleValueForProperty(selection, 'font-size', '18px')
			// 	)
			// } else {
			// 	updateToolbarState('fontSize', '18px')
			// }
			updateToolbarState('fontSize', '18px')
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

	const canViewerSeeInsertControls = !toolbarState.isImageCaption

	return (
		<div className='flex bg-primary/10 p-1 rounded-md overflow-auto overflow-y-hidden justify-center'>
			<Undo editor={editor} activeEditor={activeEditor} />
			<Redo editor={editor} activeEditor={activeEditor} />
			{toolbarState.blockType in blockTypeToBlockName &&
				activeEditor === editor && (
					<>
						<Divider />
						<TextType
							editor={editor}
							blockType={toolbarState.blockType}
							disabled={!isEditable}
						/>
					</>
				)}
			<Divider />
			<Toggles editor={editor} activeEditor={activeEditor} />
			<InsertLink
				className='mx-1'
				editor={editor}
				activeEditor={activeEditor}
				setIsLinkEditMode={setIsLinkEditMode}
			/>
			<Divider />
			<TextFormat
				className='ml-1'
				editor={editor}
				activeEditor={activeEditor}
			/>
			{canViewerSeeInsertControls && (
				<>
					<Divider />
					<Insert editor={editor} activeEditor={activeEditor} />
				</>
			)}
			{/* {toolbarState.blockType === 'code' ? ( */}
			{/* 	<DropDown */}
			{/* 		disabled={!isEditable} */}
			{/* 		buttonClassName='toolbar-item code-language' */}
			{/* 		buttonLabel={getLanguageFriendlyName(toolbarState.codeLanguage)} */}
			{/* 		buttonAriaLabel='Select language' */}
			{/* 	> */}
			{/* 		{CODE_LANGUAGE_OPTIONS.map(([value, name]) => ( */}
			{/* 			<DropDownItem */}
			{/* 				key={value} */}
			{/* 				className={`item ${dropDownActiveClass(value === toolbarState.codeLanguage)}`} */}
			{/* 				onClick={() => onCodeLanguageSelect(value)} */}
			{/* 			> */}
			{/* 				<span className='text'>{name}</span> */}
			{/* 			</DropDownItem> */}
			{/* 		))} */}
			{/* 	</DropDown> */}
			{/* ) : ( */}
			{/* 	<> */}
			{/* 		/!* <Divider /> */}
			{/* 		<FontSize */}
			{/* 			selectionFontSize={toolbarState.fontSize.slice(0, -2)} */}
			{/* 			editor={activeEditor} */}
			{/* 			disabled={!isEditable} */}
			{/* 		/> *!/ */}
			{/* 		/!* {canViewerSeeInsertControls && ( *!/ */}
			{/* 		/!* 	<Toggle *!/ */}
			{/* 		/!* 		disabled={!isEditable} *!/ */}
			{/* 		/!* 		aria-label='Toggle code' *!/ */}
			{/* 		/!* 		onClick={() => *!/ */}
			{/* 		/!* 			activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code') *!/ */}
			{/* 		/!* 		} *!/ */}
			{/* 		/!* 	> *!/ */}
			{/* 		/!* 		<Code size={16} /> *!/ */}
			{/* 		/!* 	</Toggle> *!/ */}
			{/* 		/!* )} *!/ */}
			{/* 	</> */}
			{/* )} */}
			<Divider />
			<TextAlign
				editor={activeEditor}
				value={toolbarState.elementFormat}
				isRTL={toolbarState.isRTL}
				disabled={!isEditable}
			/>
		</div>
	)
}
