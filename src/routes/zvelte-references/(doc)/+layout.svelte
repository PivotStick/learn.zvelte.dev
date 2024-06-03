<script>
	import { page } from '$app/stores';

	let { children } = $props();

	const [, base, section, item] = $derived($page.url.pathname.split('/'));
</script>

<div class="page">
	<ul class="breadcrumbs">
		<li><a href="/{base}">References</a></li>
		<li><i class="fa fa-chevron-right"></i></li>
		<li>{section}</li>
		<li><i class="fa fa-chevron-right"></i></li>
		<li>{item}</li>
	</ul>
	<div class="content typography">
		{@render children()}
	</div>
</div>

<style>
	.page {
		padding: var(--page-spacing);
		height: 100%;
		overflow: auto;
	}

	.content {
		display: grid;
		gap: 1rem;
	}

	.breadcrumbs {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: var(--page-spacing);

		a {
			display: block;
			background-color: rgba(var(--color-900));
			padding: 0.5rem;
			border-radius: 0.25rem;
			line-height: 1;
		}
	}
</style>
