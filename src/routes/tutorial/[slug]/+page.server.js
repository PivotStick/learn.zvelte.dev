import content from '$lib/client/adapters/common/index.json';

/**
 * @type {import("./$types").PageServerLoad}
 */
export async function load({ params }) {
	return {
		content
	};
}
