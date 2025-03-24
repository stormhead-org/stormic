// import { RichTextField } from '@payloadcms/richtext-lexical/client';
// import { ToolbarFeature } from '@payloadcms/richtext-lexical/client/features/ToolbarFeature';
import RichTextClient from './RichTextClient'

const CreatePostForm = () => {
	return (
		<div>
			<RichTextClient />
			<button type='submit'>Создать пост</button>
		</div>
	)
}

export default CreatePostForm
