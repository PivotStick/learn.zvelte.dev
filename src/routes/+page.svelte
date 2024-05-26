<script>
	import { WebContainer } from '@webcontainer/api';
	import { onMount, tick } from 'svelte';
	import { ready } from '$lib/client/adapters/common/index';
	import AnsiToHtml from 'ansi-to-html';
	import { basicSetup } from 'codemirror';
	import { EditorView, keymap } from '@codemirror/view';
	import { EditorState } from '@codemirror/state';
	import { indentWithTab } from '@codemirror/commands';
	import { javascript } from '@codemirror/lang-javascript';
	import Split from '$lib/components/Split.svelte';

	/**
	 * @type {HTMLIFrameElement=}
	 */
	let iframe = $state();

	let progress = $state(0);
	let currentStep = $state(0);
	let totalSteps = 6;
	let message = $state('');

	const step = (msg = '') => {
		progress = ++currentStep / totalSteps;
		message = msg;
	};

	/**
	 * @type {string[]}
	 */
	let logs = $state([]);
	/**
	 * @type {WebContainer}
	 */
	let vm;

	const files = {
		'main.js': {
			file: {
				contents: `console.log("Hello World");`
			}
		}
	};

	onMount(async () => {
		message = 'Webcontainer booting...';

		vm = await WebContainer.boot();

		vm.on('server-ready', async (port, url) => {
			await vm.mount(files);
			step('done!');
			await tick();
			if (iframe) iframe.src = url;
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
							logs.length = 0;
						} else {
							logs.push(converter.toHtml(chunk));
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

	/**
	 * @type {HTMLElement}
	 */
	let editor;

	onMount(() => {
		const state = EditorState.create({
			doc: files['main.js'].file.contents,
			extensions: [basicSetup, keymap.of([indentWithTab]), javascript()]
		});

		const view = new EditorView({
			state,
			parent: editor,
			dispatchTransactions(trs) {
				view.update(trs);
				if (trs.some((tr) => tr.docChanged)) {
					if (vm) {
						vm.fs.writeFile('main.js', view.state.doc.toString());
					}
				}
			}
		});

		return () => {
			view.destroy();
		};
	});
</script>

<main>
	<Split type="horizontal" initial={0.325}>
		{#snippet a()}
			<section>Sidebar</section>
		{/snippet}
		{#snippet b()}
			<section>
				<Split type="vertical" initial={0.525}>
					{#snippet a()}
						<Split type="horizontal" initial={0.2125}>
							{#snippet a()}
								<section>Filetree</section>
							{/snippet}
							{#snippet b()}
								<section>
									<div class="editor" bind:this={editor}></div>
								</section>
							{/snippet}
						</Split>
					{/snippet}
					{#snippet b()}
						<section>
							<h1>{Math.round(progress * 100)}%</h1>
							<p>{message}</p>

							{#if progress === 1}
								<iframe title="Output" src="" bind:this={iframe}></iframe>
							{/if}

							<div class="logs">
								{#each logs.toReversed() as log}
									<div>{@html log}</div>
								{/each}
							</div>
						</section>
					{/snippet}
				</Split>
			</section>
		{/snippet}
	</Split>
</main>

<style>
	.logs {
		max-height: 10rem;
		overflow: auto;
		display: flex;
		flex-direction: column-reverse;
	}

	main {
		height: 100vh;
		overflow: hidden;
	}
</style>
