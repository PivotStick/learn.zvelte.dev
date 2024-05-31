import content from '$lib/client/adapters/common/content.json';
import { error } from '@sveltejs/kit';
import deepmerge from 'deepmerge';

/**
 * @type {import("./$types").PageServerLoad}
 */
export async function load({ params }) {
	for (let partIndex = 0; partIndex < content.parts.length; partIndex++) {
		const part = content.parts[partIndex];

		for (let chapterIndex = 0; chapterIndex < part.chapters.length; chapterIndex++) {
			const chapter = part.chapters[chapterIndex];

			for (let exerciseIndex = 0; exerciseIndex < chapter.exercises.length; exerciseIndex++) {
				const exercise = chapter.exercises[exerciseIndex];

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
								slug: chapter.slug,
								common: chapter.common
							},
							exercise: {
								title: exercise.title,
								slug: exercise.slug,
								markdown: exercise.markdown,
								common: deepmerge(part.common, chapter.common),
								focus: chapter.focus,

								previous:
									(
										chapter.exercises[exerciseIndex - 1] ??
										part.chapters[chapterIndex - 1]?.exercises[-1] ??
										content.parts[partIndex - 1]?.chapters[-1]?.exercises[-1]
									)?.slug ?? null,

								next:
									(
										chapter.exercises[exerciseIndex + 1] ??
										part.chapters[chapterIndex + 1]?.exercises[0] ??
										content.parts[partIndex + 1]?.chapters[0]?.exercises[0]
									)?.slug ?? null,

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
