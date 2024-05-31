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
		<img src="/zvelte-logo.svg" alt="" />
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
		border-bottom: 1px solid rgb(var(--color-800));
		padding: 1rem;

		img {
			height: 4rem;
		}
	}
</style>
