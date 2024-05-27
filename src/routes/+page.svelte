<script>
	/**
	 * @type {string[]}
	 */
	let selectedRoles = $state(['read']);

	const roles = ['admin', 'read', 'onsenfou'];
</script>

<a href="/tutorial">Tutorial</a>

{#each roles as role}
	<label style="display: flex;">
		<input type="checkbox" bind:group={selectedRoles} value={role} />
		{role}
	</label>
{/each}

<p>
	{selectedRoles.join(' - ')}
</p>

<style>
	label {
		padding: 1rem;
	}
</style>
