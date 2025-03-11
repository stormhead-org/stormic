// components/lexical/Toolbar.tsx
'use client'

import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link'
import {
	INSERT_ORDERED_LIST_COMMAND,
	INSERT_UNORDERED_LIST_COMMAND
} from '@lexical/list'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $createHeadingNode } from '@lexical/rich-text'
import { INSERT_TABLE_COMMAND } from '@lexical/table'
import {
	$createParagraphNode,
	$getSelection,
	$isElementNode,
	$isRangeSelection,
	FORMAT_ELEMENT_COMMAND,
	FORMAT_TEXT_COMMAND,
	REDO_COMMAND,
	UNDO_COMMAND
} from 'lexical'
import { useEffect } from 'react'
import { useToolbarState } from '../context/ToolbarContext'

export default function Toolbar() {
	const [editor] = useLexicalComposerContext()
	const { toolbarState, updateToolbarState } = useToolbarState()

	// Синхронизация состояния тулбара с выделением
	useEffect(() => {
		return editor.registerUpdateListener(({ editorState }) => {
			editorState.read(() => {
				const selection = $getSelection()
				if ($isRangeSelection(selection)) {
					const anchorNode = selection.anchor.getNode()
					const parentNode = anchorNode.getParent()

					updateToolbarState('isBold', selection.hasFormat('bold'))
					updateToolbarState('isItalic', selection.hasFormat('italic'))
					updateToolbarState('isUnderline', selection.hasFormat('underline'))
					updateToolbarState(
						'isStrikethrough',
						selection.hasFormat('strikethrough')
					)

					if (
						$isLinkNode(parentNode as any) ||
						$isLinkNode(anchorNode as any)
					) {
						updateToolbarState('isLink', true)
					} else {
						updateToolbarState('isLink', false)
					}
				}
			})
		})
	}, [editor, updateToolbarState])

	// Форматирование текста
	const handleBold = () => {
		editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')
	}

	const handleItalic = () => {
		editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')
	}

	const handleUnderline = () => {
		editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')
	}

	const handleStrikethrough = () => {
		editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough')
	}

	// Заголовки
	const handleBlockType = (type: string) => {
		editor.update(() => {
			const selection = $getSelection()
			if ($isRangeSelection(selection)) {
				const nodes = selection.getNodes()
				nodes.forEach(node => {
					if ($isElementNode(node)) {
						const newNode =
							type === 'paragraph'
								? $createParagraphNode()
								: $createHeadingNode(type as any)
						node.replace(newNode)
						newNode.append(...node.getChildren())
					}
				})
			}
		})
		updateToolbarState('blockType', type as any)
	}

	// Списки
	const handleOrderedList = () => {
		editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
	}

	const handleUnorderedList = () => {
		editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
	}

	// Выравнивание
	const handleAlign = (alignment: 'left' | 'center' | 'right' | 'justify') => {
		editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, alignment)
		updateToolbarState('elementFormat', alignment)
	}

	// Ссылки
	const handleLink = () => {
		editor.dispatchCommand(TOGGLE_LINK_COMMAND, 'https://example.com') // Можно добавить модалку для ввода URL
	}

	// История
	const handleUndo = () => {
		editor.dispatchCommand(UNDO_COMMAND, undefined)
	}

	const handleRedo = () => {
		editor.dispatchCommand(REDO_COMMAND, undefined)
	}

	// Таблицы
	const handleInsertTable = () => {
		editor.dispatchCommand(INSERT_TABLE_COMMAND, { columns: '3', rows: '2' })
	}

	return (
		<div className='flex flex-wrap gap-2 mb-2 p-2 bg-gray-100 border-b border-gray-300'>
			{/* Форматирование текста */}
			<button
				onClick={handleBold}
				className={`px-2 py-1 ${
					toolbarState.isBold ? 'bg-gray-300' : 'bg-gray-200'
				}`}
			>
				B
			</button>
			<button
				onClick={handleItalic}
				className={`px-2 py-1 ${
					toolbarState.isItalic ? 'bg-gray-300' : 'bg-gray-200'
				}`}
			>
				I
			</button>
			<button
				onClick={handleUnderline}
				className={`px-2 py-1 ${
					toolbarState.isUnderline ? 'bg-gray-300' : 'bg-gray-200'
				}`}
			>
				U
			</button>
			<button
				onClick={handleStrikethrough}
				className={`px-2 py-1 ${
					toolbarState.isStrikethrough ? 'bg-gray-300' : 'bg-gray-200'
				}`}
			>
				S
			</button>

			{/* Заголовки */}
			<select
				value={toolbarState.blockType}
				onChange={e => handleBlockType(e.target.value)}
				className='px-2 py-1 bg-gray-200'
			>
				<option value='paragraph'>Paragraph</option>
				<option value='h1'>H1</option>
				<option value='h2'>H2</option>
				<option value='h3'>H3</option>
				<option value='h4'>H4</option>
				<option value='h5'>H5</option>
				<option value='h6'>H6</option>
			</select>

			{/* Списки */}
			<button onClick={handleOrderedList} className='px-2 py-1 bg-gray-200'>
				1.
			</button>
			<button onClick={handleUnorderedList} className='px-2 py-1 bg-gray-200'>
				•
			</button>

			{/* Выравнивание */}
			<button
				onClick={() => handleAlign('left')}
				className={`px-2 py-1 ${
					toolbarState.elementFormat === 'left' ? 'bg-gray-300' : 'bg-gray-200'
				}`}
			>
				L
			</button>
			<button
				onClick={() => handleAlign('center')}
				className={`px-2 py-1 ${
					toolbarState.elementFormat === 'center'
						? 'bg-gray-300'
						: 'bg-gray-200'
				}`}
			>
				C
			</button>
			<button
				onClick={() => handleAlign('right')}
				className={`px-2 py-1 ${
					toolbarState.elementFormat === 'right' ? 'bg-gray-300' : 'bg-gray-200'
				}`}
			>
				R
			</button>
			<button
				onClick={() => handleAlign('justify')}
				className={`px-2 py-1 ${
					toolbarState.elementFormat === 'justify'
						? 'bg-gray-300'
						: 'bg-gray-200'
				}`}
			>
				J
			</button>

			{/* Ссылки */}
			<button
				onClick={handleLink}
				className={`px-2 py-1 ${
					toolbarState.isLink ? 'bg-gray-300' : 'bg-gray-200'
				}`}
			>
				Link
			</button>

			{/* Таблицы */}
			<button onClick={handleInsertTable} className='px-2 py-1 bg-gray-200'>
				Table
			</button>

			{/* История */}
			<button onClick={handleUndo} className='px-2 py-1 bg-gray-200'>
				Undo
			</button>
			<button onClick={handleRedo} className='px-2 py-1 bg-gray-200'>
				Redo
			</button>
		</div>
	)
}
