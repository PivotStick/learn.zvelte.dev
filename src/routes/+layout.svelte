<script>
	import '../app.scss';

	let { children } = $props();
</script>

<div class="container">
	<nav>Nav</nav>
	<main>
		{@render children()}
	</main>
</div>

<style>
	.container {
		display: grid;
		height: 100dvh;
		grid-template-rows: auto 1fr;
	}
	main {
		overflow: hidden;
	}
	nav {
		height: 3.75rem;
		border-bottom: 1px solid rgb(var(--color-800));
	}
</style>
