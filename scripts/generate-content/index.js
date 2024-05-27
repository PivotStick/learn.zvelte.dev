import glob from 'tiny-glob';
import { readFile, readdir, stat, writeFile } from 'fs/promises';

async function json(path) {
	return JSON.parse(await readFile(path, 'utf8'));
}

function isValid(name = '') {
	return /^\d{2}-/.test(name);
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
			const info = await stat(`${cwd}/${partDir}/common`);
			if (info.isDirectory()) {
				// todo generate common stubs
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
				const { frontmatter } = extractFrontmatter(text, dir);
				const { title } = frontmatter;

				chapter.exercises.push({
					slug: exerciseDir.slice(3),
					title
				});
			}

			part.chapters.push(chapter);
		}

		content.parts.push(part);
	}

	await writeFile('src/lib/client/adapters/common/index.json', JSON.stringify(content));
}

main();

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
