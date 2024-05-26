import zipped from './common.zip?url';
import unzip from './unzip.cjs?url';

async function load() {
	const result = await Promise.all([
		fetch(zipped).then((res) => res.arrayBuffer()),
		fetch(unzip).then((res) => res.text())
	]);

	return {
		zipped: result[0],
		unzip: result[1]
	};
}

export const ready = load();
