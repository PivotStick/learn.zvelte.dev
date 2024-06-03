<script>
	import { page } from '$app/stores';
</script>

<div class="page">
	<button class="fa fa-arrow-left" onclick={() => history.back()}></button>
	<p>{$page.error?.message}</p>
</div>

<style>
	.page {
		padding: var(--page-spacing);
		height: 100%;

		display: flex;
		flex-direction: column;
		gap: 1rem;
		justify-content: center;
		align-items: center;
	}

	p {
		display: flex;
		font-size: 2rem;
		align-items: baseline;
	}
</style>
