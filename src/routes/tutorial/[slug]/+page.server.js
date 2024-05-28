import content from '$lib/client/adapters/common/content.json';
import { error } from '@sveltejs/kit';

/**
 * @type {import("./$types").PageServerLoad}
 */
export async function load({ params }) {
	for (const part of content.parts) {
		for (const chapter of part.chapters) {
			for (const exercise of chapter.exercises) {
				if (exercise.slug === params.slug) {
					return {
						index: content,
						content: {
							part: {
								title: part.title,
								slug: part.slug,
								common: part.common
							},
							chapter: {
								title: chapter.title,
								slug: chapter.slug
							},
							exercise: {
								title: exercise.title,
								slug: exercise.slug,
								markdown: exercise.markdown,
								'app-a': exercise['app-a'],
								'app-b': exercise['app-b'] ?? null
							}
						}
					};
				}
			}
		}
	}

	throw error(404, `Exercise "${params.slug}" not found`);
}
