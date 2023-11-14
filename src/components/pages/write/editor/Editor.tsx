import EditorJS from '@editorjs/editorjs'
import React from 'react'

export const Editor: React.FC = () => {
	React.useEffect(() => {
		const editor = new EditorJS({
			holder: 'editor'
		})

		return () => {
			editor.isReady
				.then(() => {
					editor.destroy()
				})
				.catch(e => console.error('ERROR editor cleanup', e))
		}
	}, [])

	return <div id='editor' />
}
