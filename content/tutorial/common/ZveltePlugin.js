import { parse } from "@pivotass/zvelte/parser";
import { walk } from "@pivotass/zvelte/compiler";
import { basename, dirname, join } from "path";
import { readFile, access } from "fs/promises";

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
				.catch(() => false),
		),
	);

/** @type {(args: { appPath?: string }=) => import("vite").Plugin} */
export const zvelte = ({ appPath = "/" } = {}) => ({
	name: "zvelte-vite-plugin",
    async transform(template, id) {
        if (id.endsWith(".twig")) {
			const jsPath = id.replace(/\.twig$/, ".js");
			const scssPath = id.replace(/\.twig$/, ".scss");

			const [hasJS, hasScss] = await hasPaths([jsPath, scssPath]);

			const imports = new Set([
				`import { createComponent, getComponentByKey } from "@pivotass/zvelte";`,
			]);

			// Automatically import js file if there is a js file with the same name as the component's filename
			if (hasJS) {
				imports.add(`import * as js from "./${basename(jsPath)}";`);
			}

			// Automatically includes scss file into the template if found
			if (hasScss) {
				const scss = await readFile(scssPath, "utf8");
				template += `<style lang="scss">${scss}</style>`;
			}

			const ast = parse(template, {
				component: {
					name: /^zone$/,
					key: "key",
				},
			});

			// Add imports if we find the use of other components
			// inside this component and concatenate the path to this
			// path if relative, otherwise we use the "appName" + "/components/" path as the root for
			// any absolute path used in the template
			walk(
				/** @type {import("@pivotass/zvelte/types").Any} */ (ast),
				null,
				{
					// Called for each "Component" node found in the AST
					Component(node) {
						if (node.key.data.startsWith("/")) {
							node.key.data = join(
								appPath,
								"components",
								node.key.data.slice(1),
							);
						} else {
							node.key.data = join(
								dirname(id),
								node.key.data,
							);
						}
						imports.add(`import "${node.key.data}";`);
					},
				},
			);

			const jsonAst = JSON.stringify(ast, (key, value) => {
				// Removing useless keys to have a smaller json in the client
				if (key === "start" || key === "end") return;
				return value;
			});

			// This is the component's id to be able to retrieve it at runtime
			const key = id;

			return {
				// This is the returned js for an imported twig file
				// In the future we will compile to static JS with all the logic in it
				// instead of a runtime resolver
				code: `
${Array.from(imports).join("\n")}

const ast = ${jsonAst};

export default createComponent({
    key: "${key}",
    ast,
    init: ${hasJS ? "js.default" : "undefined"},
    initScope: ${hasJS ? "js.scope" : "undefined"},
});

export const component = getComponentByKey("${key}");
`,
			};
		}
	},
});
