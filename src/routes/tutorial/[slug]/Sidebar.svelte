<script>
	import Menu from './Menu.svelte';

	/**
	 * @type {{ data: import("./$types").PageData }}
	 */
	let { data = $bindable() } = $props();
</script>

<Menu bind:data />

<div class="container">
	{@html data.content.exercise.markdown}
</div>

<style lang="scss">
	.container {
		padding: 1rem 2rem;
		line-height: 1.618;
		color: rgb(var(--color-300));

		:global(p) {
			margin: 1rem 0;

			:global(code) {
				max-width: 100%;
				padding-top: 0;
				padding-bottom: 0;
				display: inline-flex;
				overflow-x: auto;
			}
		}

		:global(.highlight) {
			--color: #dcdc0033;

			background: var(--color);
			outline: 2px solid var(--color);
			border-radius: 2px;
		}

		:global(.highlight.add) {
			--color: #00ff002e;
		}

		:global(h2) {
			border-bottom: 1px solid rgb(var(--color-900));
			margin-top: 4rem;
		}

		:global(blockquote) {
			background-color: rgba(var(--color-400) / 2%);
			color: var(--color-400);
			border: 1px solid rgb(var(--color-400));
			border-radius: var(--border-radius);
			box-shadow: 0 2px 6px rgba(var(--color-400) / 20%);
			padding: 1rem;
			margin: 1.6rem 0 2.4rem;

			&::before {
				content: 'note';
				text-transform: uppercase;
				color: rgb(var(--color-500));
				margin-bottom: 0.5rem;
				font-size: 0.8rem;
				font-weight: 700;
				display: block;
			}
		}

		:global(ul) {
			list-style: none;
		}

		:global(ul),
		:global(ol) {
			margin-left: 2rem;

			:global(li) {
				margin: 0 0 0.5em;
				line-height: 1.5;
				position: relative;

				&::before {
					content: '';
					background-color: rgb(var(--color-600));
					opacity: 0.7;
					border-radius: 0.25rem;
					width: 0.5rem;
					height: 0.5rem;
					margin-top: 0.5rem;
					margin-left: -1.2rem;
					position: absolute;
				}
			}
		}

		:global(code) {
			white-space: pre-wrap;
			background: rgba(var(--color-400) / 30%);
			margin: 0 0.2rem;
			padding: 0.2rem 0.4rem;
			border-radius: 0.25rem;
			top: -0.1rem;

			font-size: 0.8rem;
			font-family: var(--font-mono);
			line-height: 1.7;
		}

		:global(a) {
			color: rgb(var(--color-500));
			padding: 0 0 1px;
			box-shadow: inset 0 -1px rgb(var(--color-500));
			text-decoration: none;
		}

		:global(.code-block) {
			background-color: rgba(var(--color-900));
			padding: 0;
			display: block;
			overflow: hidden;
			border-radius: 0.25rem;

			:global(.filename) {
				display: flex;
				gap: 0.65rem;
				padding: 0.5rem 1rem;
				align-items: center;
				font-family: var(--font-mono);
				font-size: 0.9rem;
			}

			:global(pre) {
				:global(code) {
					display: block;
					padding: 0.5rem;
					margin: 0;
					background-color: rgba(var(--color-950) / 50%);
					color: rgba(var(--color-50));
					border-radius: 0;
				}
			}
		}
	}
</style>
