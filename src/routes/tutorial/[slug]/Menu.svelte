<script>
	import { page } from '$app/stores';
	import { expoOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';

	/**
	 * @type {{
	 *  data: import("./$types").PageData;
	 * }}
	 */
	let { data = $bindable() } = $props();

	const partIndex = $derived(data.index.parts.findIndex((p) => p.slug === data.content.part.slug));

	let open = $state(false);

	/**
	 * @param {HTMLElement} node
	 * @param {(event: MouseEvent) => void} callback
	 */
	function clickoutside(node, callback) {
		/**
		 * @param {MouseEvent} e
		 */
		function click(e) {
			if (e.target instanceof Node && !node.contains(e.target)) {
				callback(e);
			}
		}

		window.addEventListener('click', click);

		return {
			destroy() {
				window.removeEventListener('click', click);
			}
		};
	}

	/**
	 * @type {HTMLElement=}
	 */
	let navElement = $state(undefined);
</script>

<div class="container">
	<a
		href={data.content.exercise.previous
			? `/tutorial/${data.content.exercise.previous}`
			: undefined}
	>
		<i class="fa fa-arrow-left"></i>
	</a>
	<div
		class="menu"
		class:open
		role="button"
		tabindex="0"
		onkeydown={(e) => e.key === 'Enter' && (open = !open)}
		onclick={(e) => {
			if (e.currentTarget.contains(e.target) && !navElement?.contains(e.target)) open = !open;
		}}
		use:clickoutside={() => (open = false)}
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
			<nav transition:slide={{ easing: expoOut }} bind:this={navElement}>
				<ul class="parts">
					{#each data.index.parts as part, partIndex}
						<li class="part">
							<button>Part {partIndex + 1}: {part.title}</button>
							<ul class="chapters">
								{#each part.chapters as chapter}
									<li class="chapter">
										<button><i class="fa fa-chevron-right"></i> {chapter.title}</button>
										<ul class="exercises">
											{#each chapter.exercises as exercise}
												<li
													class="exercise"
													aria-current={$page.params.slug === exercise.slug ? 'page' : undefined}
												>
													<a href="/tutorial/{exercise.slug}" onclick={() => (open = false)}>
														{exercise.title}
													</a>
												</li>
											{/each}
										</ul>
									</li>
								{/each}
							</ul>
						</li>
					{/each}
				</ul>
			</nav>
		{/if}
	</div>
	<a href={data.content.exercise.next ? `/tutorial/${data.content.exercise.next}` : undefined}>
		<i class="fa fa-arrow-right"></i>
	</a>
</div>

<style lang="scss">
	.container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
		padding: 1rem 2rem;

		padding-bottom: 0;

		> a {
			cursor: pointer;

			&:not([href]) {
				pointer-events: none;
				opacity: 0.25;
			}
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

				> i {
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

			nav {
				padding: 1rem 0;

				cursor: initial;
				position: absolute;
				border: inherit;
				border-radius: 0 0 0.25rem 0.25rem;
				background-color: rgb(var(--color-900));
				left: -1px;
				right: -1px;
				top: 100%;

				overflow: auto;
				max-height: 25rem;

				button {
					background: none;
					padding: 0;
					font-size: 1rem;
				}

				ul {
					padding-left: 1.5rem;
				}

				li {
					margin-top: 0.25rem;
				}

				.parts {
					color: rgb(var(--color-400));

					.part {
						> button {
							font-weight: 700;
						}

						.chapter {
							> button {
								font-weight: 700;
								i {
									font-size: 0.8rem;
								}
							}

							.exercise {
								padding-left: 1rem;

								&[aria-current='page'] {
									pointer-events: none;
									color: rgb(var(--color-50));
								}
							}
						}
					}
				}
			}
		}
	}
</style>
