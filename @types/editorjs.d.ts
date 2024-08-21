declare module '@editorjs/paragraph' {
	import { BlockToolConstructable, ToolConstructable } from '@editorjs/editorjs'
	
	interface Paragraph extends BlockToolConstructable, ToolConstructable {
	}
	
	const Paragraph: Paragraph
	export default Paragraph
}

declare module '@editorjs/code' {
	const CodeTool: any
	export default CodeTool
}
