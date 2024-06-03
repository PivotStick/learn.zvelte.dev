<script>
	import Menu from './Menu.svelte';

	/**
	 * @type {{ data: import("./$types").PageData }}
	 */
	let { data = $bindable() } = $props();
</script>

<Menu bind:data />

<div class="container typography">
	{@html data.content.exercise.markdown}
</div>

<style lang="scss">
	.container {
		padding: 1rem 2rem;
	}
</style>
