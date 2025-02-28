import { PostsSelect as OriginalPostsSelect } from './payload-types'

declare module 'payload' {
	export interface GeneratedTypes {
		posts_select: PostsSelect
	}
}

export interface PostsSelect<T extends boolean = true>
	extends OriginalPostsSelect<T> {
	id?: T
	testField?: T // Тестовое поле
}
