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

	let loaded = $state(false);
	let progress = $state(0);
	let currentStep = $state(0);
	let totalSteps = 6;
	let message = $state('');
	let showConsole = $state(false);

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
		src: {
			directory: {
				lib: {
					directory: {
						'App.twig': {
							file: {
								contents: `<h1>Welcome!</h1>`
							}
						}
					}
				}
			}
		}
	};

	onMount(async () => {
		message = 'Booting Web Container...';

		vm = await WebContainer.boot();

		vm.on('server-ready', async (port, url) => {
			await vm.mount(files);
			step('Ready');
			await tick();
			if (iframe) {
				iframe.src = url;
			}
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
			doc: files.src.directory.lib.directory['App.twig'].file.contents,
			extensions: [basicSetup, keymap.of([indentWithTab])]
		});

		const view = new EditorView({
			state,
			parent: editor,
			dispatchTransactions(trs) {
				view.update(trs);
				if (trs.some((tr) => tr.docChanged)) {
					if (vm) {
						vm.fs.writeFile('src/lib/App.twig', view.state.doc.toString());
					}
				}
			}
		});

		return () => {
			view.destroy();
		};
	});
</script>

<svelte:window
	onmessage={(e) => {
		if (e.data === 'style') {
			if (iframe) {
				loaded = true;
				for (const styleSheet of document.styleSheets) {
					const text = styleSheet.ownerNode?.textContent;
					if (text) {
						iframe.contentWindow?.postMessage('style:' + text, '*');
					}
				}
			}
		}
	}}
/>

<div class="container">
	<Split type="horizontal" pos="33%">
		{#snippet a()}
			<section class="sidebar">Sidebar</section>
		{/snippet}
		{#snippet b()}
			<section>
				<Split type="vertical" pos="50%">
					{#snippet a()}
						<Split type="horizontal" pos="200px">
							{#snippet a()}
								<section class="filetree">File Tree</section>
							{/snippet}
							{#snippet b()}
								<section class="editor">
									<div class="editor" bind:this={editor}></div>
								</section>
							{/snippet}
						</Split>
					{/snippet}
					{#snippet b()}
						<section class="output">
							<div class="menu">
								<button class="fa fa-refresh"></button>
								<input type="text" value="/" />
								<button class="fa fa-terminal" onclick={() => (showConsole = !showConsole)}
								></button>
							</div>
							<iframe class:loaded title="Output" src="" bind:this={iframe}></iframe>

							{#if !loaded}
								<div class="loading">
									<p>{message}</p>
									<div class="progress" style:--percent="{progress * 100}%"></div>
								</div>
							{/if}

							<div class="console" class:visible={showConsole}>
								<div class="logs">
									{#each logs.toReversed() as log}
										<div>{@html log}</div>
									{/each}
								</div>
							</div>
						</section>
					{/snippet}
				</Split>
			</section>
		{/snippet}
	</Split>
</div>

<style>
	.editor {
		font-family: var(--font-mono);
	}

	.filetree,
	.sidebar,
	.output {
		border: 0px solid rgb(var(--color-800));
	}

	.filetree,
	.sidebar {
		border-right-width: 1px;
	}

	.output {
		position: relative;
		display: grid;
		grid-template-rows: auto 1fr;
		background-color: rgba(var(--color-900) / 12.5%);
		border-top-width: 1px;

		.menu {
			display: flex;
			background-color: rgb(var(--color-950));

			input {
				flex: 1;
			}
		}

		iframe {
			width: 100%;
			height: 100%;
			border: none;

			&:not(.loaded) {
				display: none;
			}
		}

		.console {
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			font-family: var(--font-mono);

			translate: 0 100%;
			transition-property: translate;

			.logs {
				max-height: 10rem;
				overflow: auto;

				display: flex;
				flex-direction: column-reverse;

				padding: 1rem;

				background-color: rgba(var(--color-900) / 30%);
				backdrop-filter: blur(3px);
				-webkit-backdrop-filter: blur(3px);
			}

			&.visible {
				translate: 0 0;
			}
		}

		.loading {
			width: 100%;
			height: 100%;

			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			gap: 1rem;

			p {
				font-size: 2rem;
				opacity: 0.5;
			}

			.progress {
				position: relative;
				height: 0.5rem;
				border-radius: 1rem;
				width: 12rem;
				background-color: rgba(var(--color-900) / 25%);

				&::after {
					content: '';
					position: absolute;

					top: 0;
					bottom: 0;
					left: 0;
					width: var(--percent);
					border-radius: 1rem;

					transition-property: width;
					background-color: rgb(var(--color-900));
				}
			}
		}
	}

	.container {
		height: 100%;
		overflow: hidden;
	}
</style>
