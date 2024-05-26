<script>
	/**
	 * @type {{
	 *  a: import("svelte").Snippet;
	 *  b: import("svelte").Snippet;
	 *  type: "horizontal" | "vertical";
	 *  initial?: number;
	 * }}
	 */
	let { a, b, type, initial = 0.5 } = $props();

	let percent = $state(initial);
	let track = false;

	/**
	 * @type {HTMLElement}
	 */
	let container;
</script>

<svelte:window
	onmousemove={(e) => {
		if (track && container) {
			e.preventDefault();
			const rect = container.getBoundingClientRect();
			if (type === 'horizontal') {
				percent = (e.clientX - rect.left) / rect.width;
			} else {
				percent = (e.clientY - rect.top) / rect.height;
			}
		}
	}}
	onmouseup={() => (track = false)}
/>

<div class="container {type}" style:--percent="{percent * 100}%" bind:this={container}>
	{@render a()}
	{@render b()}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="divider"
		onmousedown={(e) => {
			e.preventDefault();
			track = true;
		}}
	></div>
</div>

<style lang="scss">
	.container {
		display: grid;
		position: relative;
		height: 100%;
		width: 100%;

		> .divider {
			position: absolute;
			background: red;
		}

		&.horizontal {
			grid-template-columns: var(--percent) 1fr;

			> .divider {
				cursor: col-resize;
				top: 0;
				left: var(--percent);
				bottom: 0;
				translate: -50%;
				width: 3px;
			}
		}

		&.vertical {
			grid-template-rows: var(--percent) 1fr;

			> .divider {
				cursor: row-resize;
				left: 0;
				right: 0;

				top: var(--percent);
				translate: 0 -50%;
				height: 3px;
			}
		}
	}
</style>
