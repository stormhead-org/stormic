// import { ToolbarFeature } from '@payloadcms/richtext-lexical/client';
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { RichTextField } from '@payloadcms/richtext-lexical/client'

// const clientFeatures = {
// 	toolbar: {
// 		clientFeatureProvider: ToolbarFeature(),
// 	},
// };
const clientFeatures = {}

const featureClientImportMap = {}

const featureClientSchemaMap = {}

const initialLexicalFormState = {}

const lexicalEditorConfig = {
	namespace: 'my-editor',
	theme: {}
}

const field = {
	name: 'content',
	type: 'richText' as const, // Исправляем типизацию
	label: 'Содержимое',
	editor: lexicalEditor()
	// editor: lexicalEditor({
	// 	features: ({ rootFeatures }) => {
	// 		return [
	// 			...rootFeatures,
	// 			HeadingFeature({
	// 				enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4']
	// 			}),
	// 			BlocksFeature({ blocks: [Banner, Code, MediaBlock] }),
	// 			FixedToolbarFeature(),
	// 			InlineToolbarFeature(),
	// 			HorizontalRuleFeature()
	// 		]
	// 	}
	// })
}

const RichTextClient = () => {
	return (
		<RichTextField
			clientFeatures={clientFeatures}
			featureClientImportMap={featureClientImportMap}
			featureClientSchemaMap={featureClientSchemaMap}
			initialLexicalFormState={initialLexicalFormState}
			lexicalEditorConfig={lexicalEditorConfig}
			permissions={true}
			field={field}
			path='content'
		/>
	)
}

export default RichTextClient
