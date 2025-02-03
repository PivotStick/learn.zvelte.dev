import { compile } from '@pivotass/zvelte/compiler';
import { readFile, access } from 'fs/promises';
import path from 'node:path';

/**
 * Utility function to resolves booleans for each given paths
 *
 * @param {string[]} paths
 */
const hasPaths = (paths) =>
	Promise.all(
		paths.map((path) =>
			access(path)
				.then(() => true)
				.catch(() => false)
		)
	);

/** @type {(args: { appPath?: string }=) => import("vite").Plugin} */
export const zvelte = ({ appPath = '/' } = {}) => ({
	name: 'zvelte-vite-plugin',
	async transform(template, id) {
		if (id.endsWith('.zvelte')) {
			const jsPath = id.replace(/\.zvelte$/, '.js');
			const scssPath = id.replace(/\.zvelte$/, '.scss');

			const [hasJS, hasScss] = await hasPaths([jsPath, scssPath]);

			// Automatically includes scss file into the template if found
			if (hasScss) {
				const scss = await readFile(scssPath, 'utf8');
				template += `<style lang="scss">${scss}</style>`;
			}

			const result = compile(template, {
				filename: path.basename(id),
				dir: path.dirname(id),
				generate: 'dom',
				hasJS
			});

			return result;
		}
	}
});
