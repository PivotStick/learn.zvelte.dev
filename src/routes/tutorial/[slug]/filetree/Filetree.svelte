<script>
	import Directory from './Directory.svelte';
	import { setFiletreeContext } from './context.svelte';

	/**
	 * @type {{
	 *   tree: import("./types").Tree;
	 *   focus: string;
	 * }}
	 */
	let { tree, focus = $bindable('') } = $props();

	/**
	 * @type {import('./types').FiletreeContext}
	 */
	const context = $state({
		focus
	});

	setFiletreeContext(context);

	$effect(() => {
		focus = context.focus;
	});
</script>

<div class="root">
	<Directory path="/" {tree} />
</div>

<style lang="scss">
	.root {
		padding: 1rem;
	}
</style>
