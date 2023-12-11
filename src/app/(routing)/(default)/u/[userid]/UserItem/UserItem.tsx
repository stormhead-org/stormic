interface UserItemProps {
	id: number
	user: {
		id: number
		fullname: string
		avatarUrl: string
	}
	text: string
	post: {
		id: number
		title: string
	}
}

export const LiveCommentItem: React.FC<UserItemProps> = ({
	id,
	user,
	text,
	post
}) => {
	const PostTitle = post.title
	const PostTitleLength =
		PostTitle.length > 24 ? PostTitle.slice(0, 24) + '...' : PostTitle
	return <>dsa</>
}
