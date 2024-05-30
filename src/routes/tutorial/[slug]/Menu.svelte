<script>
	import { expoOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';

	/**
	 * @type {{
	 *  data: import("./$types").PageData;
	 * }}
	 */
	let { data = $bindable() } = $props();

	const partIndex = $derived(data.index.parts.findIndex((p) => p.slug === data.content.part.slug));

	$inspect(data);

	let open = $state(false);
</script>

<div class="container">
	<button class="fa fa-arrow-left"></button>
	<div
		class="menu"
		class:open
		role="button"
		tabindex="0"
		onkeydown={(e) => e.key === 'Enter' && (open = !open)}
		onclick={(e) => {
			if (e.target === e.currentTarget) open = !open;
		}}
		onblur={() => (open = false)}
	>
		<p>
			<span>Part {partIndex + 1}</span>
			<span class="slash">/</span>
			<span>{data.content.chapter.title}</span>
			<span class="slash">/</span>
			<span>{data.content.exercise.title}</span>
		</p>

		<i class="fa fa-chevron-down"></i>

		{#if open}
			<div transition:slide={{ easing: expoOut }} class="sub-menu">hahahaa</div>
		{/if}
	</div>
	<button class="fa fa-arrow-right"></button>
</div>

<style lang="scss">
	.container {
		display: flex;
		justify-content: space-between;
		gap: 2rem;
		padding: 2rem;

		padding-bottom: 0;

		> button {
			height: auto;
			width: auto;
			padding: 0;
			background: none;
		}

		.menu {
			position: relative;
			flex: 1;
			display: flex;
			justify-content: space-between;
			align-items: center;

			border-radius: 0.25rem;
			border: 1px solid rgb(var(--color-800));
			background-color: rgba(var(--color-800) / 25%);
			padding: 1rem;

			cursor: pointer;
			outline: 0px solid rgba(var(--color-800) / 50%);

			transition: 75ms linear outline-width;

			&.open {
				outline-width: 5px;
				border-bottom-left-radius: 0;
				border-bottom-right-radius: 0;

				i {
					rotate: 180deg;
				}
			}

			i {
				transition-property: rotate;
			}

			> p {
				display: flex;
				align-items: center;
				gap: 0.25rem;

				font-size: 0.85rem;

				.slash {
					opacity: 0.35;
				}

				span {
					&:last-child {
						font-weight: 800;
						color: rgb(var(--color-400));
					}
				}
			}

			.sub-menu {
				position: absolute;
				padding: 1rem;
				border: inherit;
				border-radius: 0 0 0.25rem 0.25rem;
				background-color: rgb(var(--color-900));
				left: -1px;
				right: -1px;
				top: 100%;
			}
		}
	}
</style>
