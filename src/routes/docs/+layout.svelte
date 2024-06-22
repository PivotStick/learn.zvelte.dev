<script>
	import { page } from '$app/stores';
	import { ids, setDocContext } from './context.svelte';
	import { docs } from './docs';

	let { children } = $props();

	const categoryIndex = $derived(
		docs.findIndex((c) => c.links.find((l) => l.href === $page.url.pathname))
	);
	const sectionIndex = $derived(
		docs[categoryIndex].links.findIndex((l) => l.href === $page.url.pathname)
	);

	const category = $derived(docs[categoryIndex]);
	const section = $derived(category.links[sectionIndex]);

	const currentHash = $derived($page.url.pathname + $page.url.hash);

	const prevCategory = $derived(docs[categoryIndex - 1]);
	const nextCategory = $derived(docs[categoryIndex + 1]);

	const prevSection = $derived(category.links[sectionIndex - 1]);
	const nextSection = $derived(category.links[sectionIndex + 1]);

	const prevLink = $derived(prevSection ?? prevCategory?.links.at(-1));
	const nextLink = $derived(nextSection ?? nextCategory?.links[0]);

	let asideWidth = $state(0);
	/**
	 * @type {HTMLElement=}
	 */
	let mainPage = $state();

	setDocContext();

	$effect(() => {
		if (section) {
			ids.length = 0;
			ids[0] = {
				href: section.href,
				text: section.text
			};
		}
	});
</script>

<div class="container">
	<nav aria-label="Docs">
		<ul class="sidebar">
			{#each docs as { title, links }}
				<li>
					<span>{title}</span>
					<ul>
						{#each links as { href, text, wip }}
							<li>
								<a
									aria-current={$page.url.pathname === href ? 'page' : undefined}
									aria-disabled={wip}
									{href}
								>
									{text}
								</a>
							</li>
						{/each}
					</ul>
				</li>
			{/each}
		</ul>
	</nav>

	<div class="page typography" style:--aside-width="{asideWidth}px" bind:this={mainPage}>
		<p class="category">{category?.title}</p>
		<h1>{section?.text}</h1>
		{@render children()}

		<div class="controls">
			<div>
				<span>previous</span>
				{#if prevLink}
					<a href={prevLink.href}>{prevLink.text}</a>
				{/if}
			</div>
			<div>
				<span>next</span>
				{#if nextLink}
					<a href={nextLink.href}>{nextLink.text}</a>
				{/if}
			</div>
		</div>
	</div>

	<aside bind:clientWidth={asideWidth}>
		<h2>On this page</h2>
		<ul>
			{#each ids as id, i}
				<li>
					<a
						aria-current={currentHash === id.href ? 'page' : undefined}
						href={id.href}
						onclick={i === 0 ? () => mainPage?.scrollTo({ top: 0 }) : null}
					>
						{id.text}
					</a>
				</li>
			{/each}
		</ul>
	</aside>
</div>

<style lang="scss">
	.container {
		display: grid;
		grid-template-columns: auto 1fr;
		height: 100%;
		position: relative;

		.page {
			padding: 3rem;
			padding-top: 5rem;
			overflow: auto;

			padding-right: calc(3rem + var(--aside-width));

			.category {
				font-weight: 700;
				text-transform: uppercase;
				letter-spacing: 0.12em;
				margin: 0;
				opacity: 0.8;
			}

			> h1 {
				font-size: 3rem;
				font-weight: 400;
			}

			.controls {
				margin-top: 6rem;
				display: flex;
				justify-content: space-between;
				border-top: 1px solid rgba(var(--color-800));
				padding-top: 0.5rem;

				div {
					display: grid;
					justify-items: start;

					span {
						text-transform: uppercase;
						font-size: 0.8rem;
						font-weight: 500;
						opacity: 0.7;
					}

					&:last-child {
						justify-items: end;
					}

					&:not(:has(a)) {
						opacity: 0.5;
					}
				}
			}
		}

		aside {
			position: absolute;
			right: 0;
			top: 0rem;
			padding-right: 3rem;
			padding-top: 5rem;
			width: 16rem;
			color: rgba(var(--color-400));

			> h2 {
				text-transform: uppercase;
				color: var(--sk-text-3);
				text-align: start;
				margin: 0;
				padding: 0;
				font-size: 0.9rem;
				font-weight: 400;

				padding: 0 0.5rem;
			}

			ul {
				margin-top: 1rem;

				li {
					margin-bottom: 1px;

					a {
						display: block;
						background-color: transparent;
						padding: 0.4rem 0.5rem;
						line-height: 1;

						border-left: 2px solid transparent;
						transition-property: all;

						&[aria-current='page'],
						&:hover {
							background-color: rgba(var(--color-900) / 30%);
						}

						&[aria-current='page'] {
							border-left-color: rgba(var(--color-600));
						}
					}
				}
			}
		}

		nav {
			position: relative;
			background-color: rgba(var(--color-900) / 25%);
			overflow: hidden;

			&::before {
				content: '';
				width: 1px;
				position: absolute;
				top: 0;
				bottom: 0;
				right: 0;

				background-color: rgba(var(--color-800));
			}

			.sidebar {
				height: 100%;
				width: 20rem;

				overflow-x: hidden;
				overflow-y: auto;

				padding: 3rem;
				padding-top: 5rem;
				padding-left: 5rem;
				padding-right: 0;

				> li {
					margin-bottom: 3.5rem;
					color: rgba(var(--color-400));

					> span {
						font-size: 1rem;
						text-transform: uppercase;
						letter-spacing: 0.1em;
						padding-bottom: 0.4rem;
						font-weight: 700;
						display: block;
					}

					> ul {
						> li {
							margin-top: 0.4rem;
							position: relative;

							a {
								transition-property: font-weight;

								&:hover {
									text-decoration: underline;
								}

								&::before {
									$size: 0.8rem;
									content: '';
									position: absolute;
									right: 0;
									height: $size;
									width: $size;
									background-color: rgba(var(--color-950));
									translate: 125%;
									rotate: 45deg;
									border: 1px solid rgba(var(--color-800));

									transition-property: translate;
								}

								&[aria-current='page'] {
									color: rgba(var(--color-50));
									font-weight: 700;

									&::before {
										translate: 50%;
									}
								}

								&[aria-disabled='true'] {
									pointer-events: none;
									opacity: 0.5;

									&::after {
										content: ' ~ wip';
									}
								}
							}
						}
					}
				}
			}
		}
	}
</style>
