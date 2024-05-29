<script>
	import { getFiltreeContext } from './context.svelte';

	/**
	 * @type {{
	 *  tree: import("./types").Tree;
	 *  path: string;
	 * }}
	 */
	let { tree, path } = $props();

	const ctx = getFiltreeContext();
</script>

<ul class:root={path === '/'}>
	{#each Object.entries(tree) as [name, value]}
		{@const fullpath = `${path}/${name}`.replace(/\/+/g, '/')}
		{#if value.directory}
			{@const open = value.directory.open ?? true}
			<li>
				<button class="directory" onclick={() => (value.directory.open = !open)}>
					<i class="fa {open ? 'fa-folder-open' : 'fa-folder'}"></i>
					{name}
				</button>
				{#if open}
					<svelte:self tree={value.directory} path={fullpath} />
				{/if}
			</li>
		{:else if value.file}
			<li>
				<button
					class="file"
					class:focused={fullpath === ctx.focus}
					onclick={() => (ctx.focus = fullpath)}
				>
					<i class="fa fa-file"></i>
					{name}
				</button>
			</li>
		{/if}
	{/each}
</ul>

<style lang="scss">
	ul {
		list-style: none;

		li {
			button {
				padding: 0;
				background: none;
				font-size: inherit;
				opacity: 0.5;

				i {
					$size: 1rem;
					width: $size;
					height: $size;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-bottom: 0.25rem;

					opacity: 0.5;
				}
			}

			&:has(button.focused) {
				> button {
					opacity: 1;
				}
			}
		}

		&:not(.root) {
			padding-top: 0.35rem;
			padding-left: 1.5rem;
		}
	}
</style>
