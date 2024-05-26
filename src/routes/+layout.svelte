<script>
	import '../app.scss';
	import '@fortawesome/fontawesome-free/css/all.min.css';

	import Nav from './Nav.svelte';

	let { children } = $props();
</script>

<div class="container">
	<Nav></Nav>
	<main>
		{@render children()}
	</main>
</div>

<style>
	.container {
		display: grid;
		grid-template-rows: auto 1fr;
		height: 100dvh;
	}

	main {
		overflow: hidden;
	}
</style>
