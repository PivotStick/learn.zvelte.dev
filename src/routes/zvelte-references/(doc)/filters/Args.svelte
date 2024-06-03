<script>
	let { ...args } = $props();
</script>

<h2>Arguments</h2>

<ul>
	{#each Object.keys(args) as key}
		<li><code>{key}</code>: {args[key]}</li>
	{/each}
</ul>
