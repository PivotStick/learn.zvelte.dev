import { WebContainer } from '@webcontainer/api';

/**
 * @type {Promise<WebContainer>}
 */
let promise;

export function bootWebContainer() {
	promise ??= WebContainer.boot();
	return promise;
}
