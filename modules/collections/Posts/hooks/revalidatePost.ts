import type {
	CollectionAfterChangeHook,
	CollectionAfterDeleteHook,
} from 'payload';
import { revalidatePath, revalidateTag } from 'next/cache';

import type { Post } from '@/payload-types';

export const revalidatePost: CollectionAfterChangeHook<Post> = ({
	                                                                doc,
	                                                                previousDoc,
	                                                                req,
                                                                }) => {
	const { payload, context } = req || {};
	
	// Проверяем, что req существует и это HTTP-контекст
	if (req && typeof req === 'object' && !context?.disableRevalidate) {
		if (doc._status === 'published') {
			const path = `/p/${doc.id}`;
			payload.logger.info(`Revalidating post at path: ${path}`);
			revalidatePath(path);
			revalidateTag('posts-sitemap');
		}
		
		// Если пост ранее был опубликован, а теперь не опубликован
		if (previousDoc._status === 'published' && doc._status !== 'published') {
			const oldPath = `/p/${previousDoc.id}`;
			payload.logger.info(`Revalidating old post at path: ${oldPath}`);
			revalidatePath(oldPath);
			revalidateTag('posts-sitemap');
		}
	} else {
		payload?.logger.info('Skipping revalidation in non-HTTP context (e.g., worker)');
	}
	
	return doc;
};

export const revalidateDelete: CollectionAfterDeleteHook<Post> = ({
	                                                                  doc,
	                                                                  req,
                                                                  }) => {
	const { payload, context } = req || {};
	
	// Проверяем, что req существует и это HTTP-контекст
	if (req && typeof req === 'object' && !context?.disableRevalidate) {
		const path = `/p/${doc?.id}`;
		payload.logger.info(`Revalidating deleted post at path: ${path}`);
		revalidatePath(path);
		revalidateTag('posts-sitemap');
	} else {
		payload?.logger.info('Skipping revalidation in non-HTTP context (e.g., worker)');
	}
	
	return doc;
};
