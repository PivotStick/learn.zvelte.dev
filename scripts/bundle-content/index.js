import AdmZip from 'adm-zip';
import { execSync } from 'child_process';
import { writeFileSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import * as esbuild from 'esbuild';
import glob from 'tiny-glob/sync.js';

const cwd = 'content/tutorial/common';

execSync('npm ci', { cwd });

const zip = new AdmZip();

for (const file of glob('**', { cwd, filesOnly: true, dot: true })) {
	if (file.startsWith('node_modules')) {
		continue;
	}

	zip.addFile(file, readFileSync(`${cwd}/${file}`));
}

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
