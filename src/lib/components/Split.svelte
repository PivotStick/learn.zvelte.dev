<script>
	/**
	 * @type {{
	 *  a: import("svelte").Snippet;
	 *  b: import("svelte").Snippet;
	 *  type: "horizontal" | "vertical";
	 *  pos?: string;
	 * }}
	 */
	let { a, b, type, pos = $bindable("50%") } = $props();

	let track = false;

	/**
	 * @type {HTMLElement}
	 */
	let container;
</script>

<svelte:window
	onmouseup={() => (track = false)}
	onmousemove={(e) => {
		if (track && container) {
			e.preventDefault();
			const rect = container.getBoundingClientRect();
			if (type === 'horizontal') {
				const x = e.clientX - rect.left;
				pos = pos.endsWith("%") ? `${(x / rect.width) * 100}%`  : `${x}px`;
			} else {
				const y = e.clientY - rect.top;
				pos = pos.endsWith("%") ? `${(y / rect.height) * 100}%`  : `${y}px`;
			}
		}
	}}
/>

<div class="container {type}" style:--pos={pos} bind:this={container}>
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
		}

		&.horizontal {
			grid-template-columns: var(--pos) 1fr;

			> .divider {
				cursor: col-resize;
				top: 0;
				left: var(--pos);
				bottom: 0;
				translate: -50%;
				width: 3px;
			}
		}

		&.vertical {
			grid-template-rows: var(--pos) 1fr;

			> .divider {
				cursor: row-resize;
				left: 0;
				right: 0;

				top: var(--pos);
				translate: 0 -50%;
				height: 3px;
			}
		}
	}
</style>
