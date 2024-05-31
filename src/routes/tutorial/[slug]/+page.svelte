<script>
	import { WebContainer } from '@webcontainer/api';
	import { onMount, tick } from 'svelte';
	import { ready } from '$lib/client/adapters/common/index';
	import AnsiToHtml from 'ansi-to-html';
	import { basicSetup } from 'codemirror';
	import { EditorView, keymap } from '@codemirror/view';
	import { EditorState } from '@codemirror/state';
	import { indentWithTab } from '@codemirror/commands';
	import Split from '$lib/components/Split.svelte';
	import Sidebar from './Sidebar.svelte';
	import Filetree from './filetree/Filetree.svelte';
	import { javascript } from '@codemirror/lang-javascript';
	import { html } from '@codemirror/lang-html';
	import deepmerge from 'deepmerge';

	let { data } = $props();

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
	 * @type {WebContainer=}
	 */
	let vm = $state();

	let previousTree = {};
	/**
	 * @param {any} filetree
	 */
	async function reset(filetree) {
		const filesToDelete = treeToFlat(previousTree);
		await Promise.all(
			filesToDelete.map((path) => {
				return vm?.fs.rm(path, { force: true });
			})
		);

		await vm?.mount((previousTree = filetree));
	}

	function treeToFlat(tree = {}) {
		/** @type {string[]} */
		const paths = [];

		function walk(o, path = ['']) {
			for (const key of Object.keys(o)) {
				if (o[key].directory) {
					walk(o[key].directory, [...path, key]);
				} else {
					paths.push([...path, key].join('/'));
				}
			}
		}

		walk(tree);

		return paths;
	}

	onMount(async () => {
		message = 'Booting Web Container...';

		const rvm = (vm = await WebContainer.boot());
		await rvm.mount(data.content.exercise.common);
		rvm.on('server-ready', async (port, url) => {
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
			const process = await rvm.spawn(command, args);
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

	$effect(() => {
		if (vm) {
			reset(data.content.exercise['app-a']);
		}
	});

	/**
	 * @type {HTMLElement}
	 */
	let editor;

	const focusedFile = $derived.by(() => {
		const keys = data.content.exercise.focus.replace(/^\/+/, '').split('/');
		const tree = data.content.exercise['app-a'];

		// @ts-ignore
		return /** @type {{ contents: string }} */ (
			// @ts-ignore
			keys.reduce((o, key) => o?.[key]?.directory ?? o?.[key]?.file, tree)
		);
	});

	onMount(() => {
		const view = new EditorView({
			parent: editor,
			dispatchTransactions(trs) {
				view.update(trs);
				if (trs.some((tr) => tr.docChanged)) {
					if (vm) {
						focusedFile.contents = view.state.doc.toString();
						vm.fs.writeFile(data.content.exercise.focus, focusedFile.contents);
					}
				}
			}
		});

		/**
		 * @type {typeof focusedFile}
		 */
		let lastFocusedFile;

		$effect(() => {
			if (lastFocusedFile !== focusedFile) {
				lastFocusedFile = focusedFile;
				const extensions = [basicSetup, keymap.of([indentWithTab])];

				if (data.content.exercise.focus.endsWith('.js')) {
					extensions.push(javascript());
				}

				if (data.content.exercise.focus.endsWith('.twig')) {
					extensions.push(
						html({
							selfClosingTags: true
						})
					);
				}

				const state = EditorState.create({
					doc: focusedFile.contents,
					extensions
				});

				view.setState(state);
			}
		});

		return () => {
			view.destroy();
		};
	});
</script>

<svelte:head>
	<title>{data.content.chapter.title} / {data.content.exercise.title} • Zvelte Tutorial</title>

	<meta name="twitter:title" content="{data.content.exercise.title} • Zvelte Tutorial" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:site" content="@sveltejs" />
	<meta name="twitter:creator" content="@sveltejs" />
	<meta name="twitter:image" content="https://zvelte.dev/images/twitter-thumbnail.jpg" />
	<meta property="twitter:domain" content="learn.zvelte.dev" />
	<meta property="twitter:url" content="https://learn.zvelte.dev" />

	<meta property="og:title" content="{data.content.exercise.title} • Zvelte Tutorial" />
	<meta property="og:url" content="https://learn.zvelte.dev" />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="https://zvelte.dev/images/twitter-thumbnail.jpg" />
</svelte:head>

<svelte:window
	onmessage={(e) => {
		if (e.data === 'style') {
			if (iframe) {
				loaded = true;
				const allRules = [...document.styleSheets]
					.flatMap((styleSheet) => [...styleSheet.cssRules].map((r) => r.cssText).join('\n'))
					.join('\n');
				iframe.contentWindow?.postMessage('style:' + allRules, '*');
			}
		}
	}}
/>

<div class="container">
	<Split type="horizontal" min="360px" max="50%" pos="33%">
		{#snippet a()}
			<section class="sidebar">
				<Sidebar bind:data />
			</section>
		{/snippet}
		{#snippet b()}
			<section>
				<Split type="vertical" min="100px" max="-4.1rem" pos="50%">
					{#snippet a()}
						<Split type="horizontal" min="120px" max="300px" pos="200px">
							{#snippet a()}
								<section class="filetree">
									<Filetree
										tree={data.content.exercise['app-a']}
										bind:focus={data.content.exercise.focus}
									/>
								</section>
							{/snippet}
							{#snippet b()}
								<section class="editor" bind:this={editor}></section>
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
									<img src="/zvelte-logo-outlined.svg" alt="" />
									<div class="progress" style:--percent="{progress * 100}%"></div>
									<p>{message}</p>
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

	.sidebar {
		overflow: auto;
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

			img {
				opacity: 0.125;
				mix-blend-mode: screen;
			}

			p {
				opacity: 0.5;
			}

			.progress {
				position: relative;
				height: 0.5rem;
				border-radius: 1rem;
				width: 12rem;
				background-color: rgba(var(--color-900) / 75%);

				&::after {
					content: '';
					position: absolute;

					top: 0;
					bottom: 0;
					left: 0;
					width: var(--percent);
					border-radius: 1rem;

					transition-property: width;
					background-color: rgb(var(--color-800));
				}
			}
		}
	}

	.container {
		height: 100%;
		overflow: hidden;
	}
</style>
