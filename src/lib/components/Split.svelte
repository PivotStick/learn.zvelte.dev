<script context="module">
	/**
	 * @param {HTMLElement} element
	 * @param {number} size
	 * @param {string} min
	 * @param {string} max
	 * @param {string} pos
	 * @param {'min' | 'max'} priority
	 * @returns {string}
	 */
	function constrain(element, size, min, max, pos, priority) {
		let min_px = normalize(min, element, size);
		let max_px = normalize(max, element, size);
		let pos_px = normalize(pos, element, size);

		if (min_px < 0) min_px += size;
		if (max_px < 0) max_px += size;

		pos_px =
			priority === 'min'
				? Math.max(min_px, Math.min(max_px, pos_px))
				: Math.min(max_px, Math.max(min_px, pos_px));

		const position = pos.endsWith('%')
			? size
				? `${(100 * pos_px) / size}%`
				: '0%'
			: `${pos_px}px`;

		return position;
	}

	/**
	 * @param {string} str
	 * @param {HTMLElement} element
	 * @param {number} size
	 */
	function normalize(str, element, size) {
		const num = parseFloat(str);

		if (str.endsWith('px')) {
			return num;
		}

		if (str.endsWith('%')) {
			return (size * num) / 100;
		}

		if (str.endsWith('rem')) {
			return num * parseFloat(getComputedStyle(document.documentElement).fontSize);
		}

		if (str.endsWith('em')) {
			return num * parseFloat(getComputedStyle(element).fontSize);
		}

		throw new Error(`Invalid length: ${str}`);
	}
</script>

<script>
	/**
	 * @type {{
	 *  a: import("svelte").Snippet;
	 *  b: import("svelte").Snippet;
	 *  type: "horizontal" | "vertical";
	 *  min?: string;
	 *  max?: string;
	 *  pos?: string;
	 *  priority?: "min" | "max";
	 * }}
	 */
	let { a, b, min = '0%', max = '100%', priority = 'min', type, pos = $bindable('50%') } = $props();

	let track = false;

	/**
	 * @type {HTMLElement}
	 */
	let container;

	let w = $state(0);
	let h = $state(0);

	// constrain position
	$effect(() => {
		if (container) {
			const size = type === 'horizontal' ? w : h;
			pos = constrain(container, size, min, max, pos, priority);
		}
	});
</script>

<svelte:window
	onmouseup={() => (track = false)}
	onmousemove={(e) => {
		if (track && container) {
			e.preventDefault();
			const rect = container.getBoundingClientRect();
			if (type === 'horizontal') {
				const x = e.clientX - rect.left;
				pos = pos.endsWith('%') ? `${(x / rect.width) * 100}%` : `${x}px`;
			} else {
				const y = e.clientY - rect.top;
				pos = pos.endsWith('%') ? `${(y / rect.height) * 100}%` : `${y}px`;
			}
		}
	}}
/>

<div
	class="container {type}"
	style:--pos={pos}
	bind:clientWidth={w}
	bind:clientHeight={h}
	bind:this={container}
>
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
