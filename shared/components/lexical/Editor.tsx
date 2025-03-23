'use client'

import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
import { CharacterLimitPlugin } from '@lexical/react/LexicalCharacterLimitPlugin'
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin'
import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin'
import { ClickableLinkPlugin } from '@lexical/react/LexicalClickableLinkPlugin'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { HashtagPlugin } from '@lexical/react/LexicalHashtagPlugin'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { HorizontalRulePlugin } from '@lexical/react/LexicalHorizontalRulePlugin'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { SelectionAlwaysOnDisplay } from '@lexical/react/LexicalSelectionAlwaysOnDisplay'
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin'
import { useLexicalEditable } from '@lexical/react/useLexicalEditable'
import { useEffect, useState } from 'react'
import { CAN_USE_DOM } from './canUseDOM'
import { useSharedHistoryContext } from './context/SharedHistoryContext'
import AutoEmbedPlugin from './plugins/AutoEmbedPlugin'
import CodeActionMenuPlugin from './plugins/CodeActionMenuPlugin'
import CodeHighlightPlugin from './plugins/CodeHighlightPlugin'
import ContextMenuPlugin from './plugins/ContextMenuPlugin'
import DragDropPaste from './plugins/DragDropPastePlugin'
import DraggableBlockPlugin from './plugins/DraggableBlockPlugin'
import EmojiPickerPlugin from './plugins/EmojiPickerPlugin'
import EmojisPlugin from './plugins/EmojisPlugin'
import FloatingLinkEditorPlugin from './plugins/FloatingLinkEditorPlugin'
import FloatingTextFormatToolbarPlugin from './plugins/FloatingTextFormatToolbarPlugin'
import ImagesPlugin from './plugins/ImagesPlugin'
import InlineImagePlugin from './plugins/InlineImagePlugin'
import { LayoutPlugin } from './plugins/LayoutPlugin/LayoutPlugin'
import LinkPlugin from './plugins/LinkPlugin'
import { MaxLengthPlugin } from './plugins/MaxLengthPlugin'
import PollPlugin from './plugins/PollPlugin'
import TabFocusPlugin from './plugins/TabFocusPlugin'
import ToolbarPlugin from './plugins/ToolbarPlugin'
import YouTubePlugin from './plugins/YouTubePlugin'
import ContentEditable from './ui/ContentEditable'

export default function Editor() {
	const { historyState } = useSharedHistoryContext()

	const defaultBooleans = {
		isMaxLength: false,
		isCharLimit: false,
		hasLinkAttributes: false,
		isCharLimitUtf8: false,
		isRichText: true,
		shouldUseLexicalContextMenu: false,
		selectionAlwaysOnDisplay: false
	}

	const {
		isMaxLength,
		isCharLimit,
		hasLinkAttributes,
		isCharLimitUtf8,
		isRichText,
		shouldUseLexicalContextMenu,
		selectionAlwaysOnDisplay
	} = defaultBooleans

	const isEditable = useLexicalEditable()
	const placeholder = isRichText
		? 'Однажды, в холодную зимнюю пору...'
		: 'Enter some plain text...'
	const [floatingAnchorElem, setFloatingAnchorElem] =
		useState<HTMLDivElement | null>(null)
	const [isSmallWidthViewport, setIsSmallWidthViewport] =
		useState<boolean>(false)
	const [editor] = useLexicalComposerContext()
	const [activeEditor, setActiveEditor] = useState(editor)
	const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false)

	const onRef = (_floatingAnchorElem: HTMLDivElement) => {
		if (_floatingAnchorElem !== null) {
			setFloatingAnchorElem(_floatingAnchorElem)
		}
	}

	useEffect(() => {
		const updateViewPortWidth = () => {
			const isNextSmallWidthViewport =
				CAN_USE_DOM && window.matchMedia('(max-width: 1025px)').matches

			if (isNextSmallWidthViewport !== isSmallWidthViewport) {
				setIsSmallWidthViewport(isNextSmallWidthViewport)
			}
		}
		updateViewPortWidth()
		window.addEventListener('resize', updateViewPortWidth)

		return () => {
			window.removeEventListener('resize', updateViewPortWidth)
		}
	}, [isSmallWidthViewport])

	return (
		<>
			{isRichText && (
				<ToolbarPlugin
					editor={editor}
					activeEditor={activeEditor}
					setActiveEditor={setActiveEditor}
					setIsLinkEditMode={setIsLinkEditMode}
				/>
			)}
			<div
				className={`editor-container ${''} ${!isRichText ? 'plain-text' : ''}`}
			>
				{isMaxLength && <MaxLengthPlugin maxLength={30} />}
				<DragDropPaste />
				<AutoFocusPlugin />
				{selectionAlwaysOnDisplay && <SelectionAlwaysOnDisplay />}
				<ClearEditorPlugin />
				<EmojiPickerPlugin />
				<AutoEmbedPlugin />
				<EmojisPlugin />
				<HashtagPlugin />
				{/* <AutoLinkPlugin matchers={[]} /> */}
				{isRichText ? (
					<>
						<HistoryPlugin externalHistoryState={historyState} />
						<RichTextPlugin
							contentEditable={
								<div className='min-h-[150px] max-w-full border-0 flex relative outline-0 z-0 resize-y'>
									<div
										className='flex-1 max-w-full relative resize-y z-[-1]'
										ref={onRef}
									>
										<ContentEditable placeholder={placeholder} />
									</div>
								</div>
							}
							ErrorBoundary={LexicalErrorBoundary}
						/>
						<CodeHighlightPlugin />
						<ListPlugin />
						<CheckListPlugin />
						<ImagesPlugin />
						<InlineImagePlugin />
						<LinkPlugin hasLinkAttributes={hasLinkAttributes} />
						<PollPlugin />
						<YouTubePlugin />
						<ClickableLinkPlugin disabled={isEditable} />
						<HorizontalRulePlugin />
						<TabFocusPlugin />
						<TabIndentationPlugin maxIndent={7} />
						<LayoutPlugin />
						{floatingAnchorElem && (
							<>
								<FloatingLinkEditorPlugin
									anchorElem={floatingAnchorElem}
									isLinkEditMode={isLinkEditMode}
									setIsLinkEditMode={setIsLinkEditMode}
								/>
							</>
						)}
						{floatingAnchorElem && !isSmallWidthViewport && (
							<>
								<DraggableBlockPlugin anchorElem={floatingAnchorElem} />
								<CodeActionMenuPlugin anchorElem={floatingAnchorElem} />
								<FloatingTextFormatToolbarPlugin
									anchorElem={floatingAnchorElem}
									setIsLinkEditMode={setIsLinkEditMode}
								/>
							</>
						)}
					</>
				) : (
					<>
						<HistoryPlugin externalHistoryState={historyState} />
					</>
				)}
				{(isCharLimit || isCharLimitUtf8) && (
					<CharacterLimitPlugin
						charset={isCharLimit ? 'UTF-16' : 'UTF-8'}
						maxLength={5}
					/>
				)}
				{shouldUseLexicalContextMenu && <ContextMenuPlugin />}
			</div>
		</>
	)
}
