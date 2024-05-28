import { readFile, readdir, stat, writeFile } from 'fs/promises';
import { transform } from './markdown';

async function json(path) {
	return JSON.parse(await readFile(path, 'utf8'));
}

function isValid(name = '') {
	return /^\d{2}-/.test(name);
}

async function exists(path = '') {
	try {
		await stat(path);
		return true;
	} catch {
		return false;
	}
}

async function main() {
	const cwd = 'content/tutorial';

	const parts = (await readdir(cwd)).filter(isValid);
	const content = { parts: [] };

	for (const partDir of parts) {
		const chapters = (await readdir(`${cwd}/${partDir}`)).filter(isValid);

		const part = {
			slug: partDir,
			title: (await json(`${cwd}/${partDir}/meta.json`)).title,
			chapters: []
		};

		try {
			const commonDir = `${cwd}/${partDir}/common`;
			const info = await stat(commonDir);
			if (info.isDirectory()) {
				// todo generate common stubs
				part.common = await toStubs(commonDir);
			}
		} catch (error) {}

		for (const chapterDir of chapters) {
			const exercises = (await readdir(`${cwd}/${partDir}/${chapterDir}`)).filter(isValid);

			const chapter = {
				slug: chapterDir,
				title: (await json(`${cwd}/${partDir}/${chapterDir}/meta.json`)).title,
				exercises: []
			};

			for (const exerciseDir of exercises) {
				const dir = `${cwd}/${partDir}/${chapterDir}/${exerciseDir}`;

				const text = await readFile(`${dir}/README.md`, 'utf-8');
				const { frontmatter, markdown } = extractFrontmatter(text, dir);
				const { title } = frontmatter;

				const exercise = {
					slug: exerciseDir.slice(3),
					title,
					markdown: await transform(markdown, {})
				};

				if (await exists(`${dir}/app-a`)) {
					exercise['app-a'] = await toStubs(`${dir}/app-a`);
				} else {
					throw new Error(`app-a is a required directoy`);
				}

				if (await exists(`${dir}/app-b`)) {
					exercise['app-b'] = await toStubs(`${dir}/app-b`);
				} else {
					exercise['app-b'] = null;
				}

				chapter.exercises.push(exercise);
			}

			part.chapters.push(chapter);
		}

		content.parts.push(part);
	}

	await writeFile('src/lib/client/adapters/common/content.json', JSON.stringify(content));
}

main();

async function toStubs(dir = '') {
	const tree = {};

	async function walk(dir = '', tree) {
		const entries = await readdir(dir, { withFileTypes: true });
		for (const entry of entries) {
			tree[entry.name] = {};

			if (entry.isDirectory()) {
				await walk(`${dir}/${entry.name}`, (tree[entry.name].directory = {}));
			} else {
				tree[entry.name].file = {
					contents: await readFile(`${dir}/${entry.name}`, 'utf8')
				};
			}
		}
	}

	await walk(dir, tree);

	return tree;
}

/**
 * @param {string} markdown
 * @param {string} dir
 */
function extractFrontmatter(markdown, dir) {
	const match = /---\n([^]+?)\n---\n([^]+)/.exec(markdown);
	if (!match) {
		throw new Error(`bad markdown for ${dir}`);
	}

	/** @type {Record<string, string>} */
	const frontmatter = {};

	for (const line of match[1].split('\n')) {
		const index = line.indexOf(':');
		if (index !== -1) {
			frontmatter[line.slice(0, index).trim()] = line.slice(index + 1).trim();
		}
	}

	return { frontmatter, markdown: match[2] };
}
