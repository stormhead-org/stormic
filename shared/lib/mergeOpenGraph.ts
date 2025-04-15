import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
	type: 'website',
	description: 'Социальная платформа с открытым исходным кодом.',
	images: [
		{
			url: `${getServerSideURL()}/website-template-OG.webp`
		}
	],
	siteName: 'Stormic Community Management System',
	title: 'Stormic Community Management System'
}

export const mergeOpenGraph = (
	og?: Metadata['openGraph']
): Metadata['openGraph'] => {
	return {
		...defaultOpenGraph,
		...og,
		images: og?.images ? og.images : defaultOpenGraph.images
	}
}
