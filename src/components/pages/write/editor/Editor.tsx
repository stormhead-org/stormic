import Code from '@editorjs/code'
import EditorJS from '@editorjs/editorjs'
import Header from '@editorjs/header'
import React, { useRef } from 'react'

const Editor: React.FC = () => {
	const editorRef = useRef<EditorJS | null>(null)
	React.useEffect(() => {
		if (!editorRef.current?.isReady) {
			const editor = new EditorJS({
				holder: 'editor',
				minHeight: 0,
				// autofocus: true,
				placeholder: 'Введите текст вашей статьи',
				hideToolbar: false,
				tools: {
					code: Code,
					header: {
						class: Header,
						/**
						 * This property will override the common settings
						 * That means that this tool will have only Marker and Link inline tools
						 * If 'true', the common settings will be used.
						 * If 'false' or omitted, the Inline Toolbar wont be shown
						 */
						inlineToolbar: ['marker', 'link'],
						config: {
							placeholder: 'Header'
						},
						shortcut: 'Tab'
					}
				},
				i18n: {
					messages: {
						ui: {
							// Translations of internal UI components of the editor.js core
						},
						toolNames: {
							// Section for translation Tool Names: both block and inline tools
						},
						tools: {
							// Section for passing translations to the external tools classes
							// The first-level keys of this object should be equal of keys ot the 'tools' property of EditorConfig
						},
						blockTunes: {
							// Section allows to translate Block Tunes
						}
					}
				}
			})

			editorRef.current = editor
		}

		return () => {
			if (editorRef.current && editorRef.current.destroy) {
				editorRef.current.destroy()
			}
		}
	}, [])

	return (
		<div
			id='editor'
			// ref={editorRef}
		/>
	)
}

export default Editor
