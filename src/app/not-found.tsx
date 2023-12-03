import Link from 'next/link'
import MainLayout from './(routing)/(default)/layout'

export default function NotFound() {
	return (
		<MainLayout>
			<div>
				<h1>Not found – 404!</h1>
				<div>
					<Link href='/'>Go back to Home</Link>
				</div>
			</div>
		</MainLayout>
	)
}
