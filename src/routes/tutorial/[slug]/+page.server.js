import { get_exercise } from '$lib/server/content.js';
import { error, redirect } from '@sveltejs/kit';

/**
 * @type {import("./$types").PageServerLoad}
 */
export async function load({ params }) {
	if (params.slug === 'local-transitions') {
		redirect(307, '/tutorial/global-transitions');
	}

	const exercise = await get_exercise(params.slug);

	if (!exercise) {
		error(404, 'No such tutorial found');
	}

	return {
		exercise
	};
}
