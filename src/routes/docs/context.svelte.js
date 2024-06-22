import { getContext, setContext, tick } from 'svelte';

const key = '__docs_context__';

/**
 * @type {{
 *  href: string;
 *  text: string;
 * }[]}
 */
export let ids = $state([]);

export function setDocContext() {
	setContext(key, {
		/**
		 * @param {HTMLElement} node
		 * @param {string} name
		 */
		id(node, name) {
			node.id = name;

			const id = {
				href: `${location.pathname}#${node.id}`,
				text: node.textContent ?? '??'
			};

			tick().then(() => {
				ids.push(id);
			});
		}
	});
}

/**
 * @returns {{
 *  id(node: HTMLElement, name: string): void;
 * }}
 */
export function getDocContext() {
	return getContext(key);
}
