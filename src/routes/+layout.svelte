<script>
	import '../app.scss';
	import '@fortawesome/fontawesome-free/css/all.min.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>Learn Zvelte</title>
</svelte:head>

<div class="container">
	<nav>
		<a href="/" class="--unset">
			<img src="/zvelte-logo.svg" alt="" />
		</a>

		<ul class="links typography">
			<li>
				<a href="/docs/introduction">DOC</a>
			</li>
			<li>
				<a href="/tutorial" data-sveltekit-reload>Tutorial</a>
			</li>
			<li>
				<a href="/zvelte-references">Zvelte References</a>
			</li>
		</ul>
	</nav>
	<main>
		{@render children()}
	</main>
</div>

<style lang="scss">
	.container {
		display: grid;
		height: 100dvh;
		grid-template-rows: auto 1fr;
	}

	main {
		overflow: hidden;
	}

	nav {
		display: flex;
		align-items: center;

		border-bottom: 1px solid rgb(var(--color-800));
		padding: 1rem;

		img {
			height: 3rem;
		}

		.links {
			margin-left: auto;
			margin-right: 2rem;

			display: flex;
			gap: 1rem;
		}
	}
</style>
