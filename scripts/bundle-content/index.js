import AdmZip from 'adm-zip';
import { execSync } from 'child_process';
import * as esbuild from 'esbuild';
import { writeFileSync, readdirSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';

const cwd = 'content/tutorial/common';

execSync('npm ci', { cwd });

const zip = new AdmZip();

function glob(dir = '') {
	const entries = readdirSync(dir, { withFileTypes: true });
	for (const entry of entries) {
		const path = `${dir}/${entry.name}`;

		if (entry.isFile()) {
			const file = path.replace(cwd + '/', '');
			zip.addFile(file, readFileSync(path));
		} else if (entry.isDirectory() && entry.name !== 'node_modules') {
			glob(path);
		}
	}
}

glob(cwd);

writeFileSync('src/lib/client/adapters/common/common.zip', zip.toBuffer());

// bundle adm-zip so we can use it in the webcontainer
esbuild.buildSync({
	entryPoints: [fileURLToPath(new URL('./unzip.js', import.meta.url))],
	bundle: true,
	minify: true,
	platform: 'node',
	format: 'cjs',
	outfile: 'src/lib/client/adapters/common/unzip.cjs'
});
