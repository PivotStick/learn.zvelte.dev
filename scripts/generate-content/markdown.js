import { Marked } from 'marked';

/** @type {Partial<import('marked').Renderer>} */
const defaultRenderer = {};

/**
 * @param {string} markdown
 * @param {Partial<import('marked').Renderer>} options
 */
export async function transform(markdown, options) {
	const marked = new Marked({
		renderer: {
			...defaultRenderer,
			...options
		}
	});

	return (await marked.parse(markdown)) ?? '';
}
