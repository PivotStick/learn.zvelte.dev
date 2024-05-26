<script>
	import { WebContainer } from '@webcontainer/api';
	import { onMount } from 'svelte';
	import { ready } from '$lib/client/adapters/common/index';
	import AnsiToHtml from 'ansi-to-html';

	/**
	 * @type {HTMLIFrameElement}
	 */
	let iframe;

	let progress = 0;
	let currentStep = 0;
	let totalSteps = 6;
	let message = '';

	const step = (msg = '') => {
		progress = ++currentStep / totalSteps;
		message = msg;
	};

	/**
	 * @type {string[]}
	 */
	let logs = [];

	onMount(async () => {
		message = 'Webcontainer booting...';

		const vm = await WebContainer.boot();

		vm.on('server-ready', (port, url) => {
			step('done!');
			iframe.src = url;
		});

		step('Fetching zipped files...');

		const common = await ready;

		step('Mounting virtual files...');

		await vm.mount({
			'common.zip': {
				file: { contents: new Uint8Array(common.zipped) }
			},
			'unzip.cjs': {
				file: { contents: common.unzip }
			}
		});

		step('Unzipping common files...');

		const converter = new AnsiToHtml();

		/**
		 * @param {string} command
		 * @param {string[]} args
		 */
		const spawn = async (command, args) => {
			const process = await vm.spawn(command, args);
			process.output.pipeTo(
				new WritableStream({
					write(chunk) {
						if (chunk === '\x1B[1;1H') {
							// clear screen
							logs = [];
						} else {
							logs = [...logs, converter.toHtml(chunk)];
						}
					}
				})
			);

			const exit = await process.exit;
			return exit === 0;
		};

		await spawn('node', ['unzip.cjs']);

		step('Installing dependencies...');

		await spawn('npm', ['install']);

		step('Starting dev server...');

		await spawn('npm', ['run', 'dev']);
	});
</script>

<h1>{Math.round(progress * 100)}%</h1>
<p>{message}</p>

<iframe title="Output" src="" bind:this={iframe}></iframe>

<div class="logs">
	{#each logs.toReversed() as log}
		<div>{@html log}</div>
	{/each}
</div>

<style>
	.logs {
		max-height: 10rem;
		overflow: auto;
		display: flex;
		flex-direction: column-reverse;
	}
</style>
