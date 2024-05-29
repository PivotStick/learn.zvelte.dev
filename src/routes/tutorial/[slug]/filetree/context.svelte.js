import { getContext, setContext } from 'svelte';

const key = '__filetree_ctx__';

/**
 * @param {import('./types').FiletreeContext} context
 */
export function setFiletreeContext(context) {
	setContext(key, context);
}

/**
 * @returns {import('./types').FiletreeContext}
 */
export function getFiltreeContext() {
	return getContext(key);
}
