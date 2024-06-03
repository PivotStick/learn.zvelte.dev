<script>
	import { indentWithTab } from '@codemirror/commands';
	import { EditorState } from '@codemirror/state';
	import { keymap } from '@codemirror/view';
	import { EditorView, basicSetup } from 'codemirror';
	import { onMount } from 'svelte';

	/**
	 * @type {{
	 *  value?: string;
	 *  extensions?: import('@codemirror/state').Extension[];
	 * }}
	 */
	let { extensions = [], value = '' } = $props();

	/**
	 * @type {HTMLElement=}
	 */
	let container = $state(undefined);

	onMount(() => {
		const view = new EditorView({
			parent: container,
			state: EditorState.create({
				doc: value,
				extensions: [
					basicSetup,
					keymap.of([indentWithTab]),
					EditorState.readOnly.of(true),
					...extensions
				]
			})
		});

		return () => {
			view.destroy();
		};
	});
</script>

<div bind:this={container} class="editor"></div>

<style>
	.editor {
		border: 1px solid rgba(var(--color-100) / 10%);
		border-radius: 0.5rem;
		padding: 1rem 0;
	}
</style>
