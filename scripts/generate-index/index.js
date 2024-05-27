import glob from 'tiny-glob';

async function getIndex() {
	const files = await glob('[0-9][0-9]-*/[0-9][0-9]-*/[0-9][0-9]-*', {
		cwd: 'content/tutorial'
	});

	console.log(files);
}

getIndex();
