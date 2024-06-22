<script>
	import { page } from '$app/stores';
	import { docs } from './docs';

	let { children } = $props();

	const category = $derived(docs.find((c) => c.links.find((l) => l.href === $page.url.pathname)));
	const section = $derived(category?.links.find((l) => l.href === $page.url.pathname));
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
									{href}
									aria-disabled={wip}
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

	<div class="page typography">
		<p class="category">{category?.title}</p>
		<h1>{section?.text}</h1>
		{@render children()}
	</div>
</div>

<style lang="scss">
	.container {
		display: grid;
		grid-template-columns: auto 1fr;
		height: 100%;

		.page {
			padding: 3rem;
			padding-top: 5rem;
			overflow: auto;

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
								&:hover {
									text-decoration: underline;
								}

								&[aria-current='page'] {
									color: rgba(var(--color-50));
									font-weight: 700;

									&::before {
										$size: 0.8rem;
										content: '';
										position: absolute;
										right: 0;
										height: $size;
										width: $size;
										background-color: rgba(var(--color-950));
										translate: 50%;
										rotate: 45deg;
										border: 1px solid rgba(var(--color-800));
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
