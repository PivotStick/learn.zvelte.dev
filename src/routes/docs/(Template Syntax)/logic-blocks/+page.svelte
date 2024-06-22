<script>
	import IfPage from '../../../zvelte-references/(doc)/tags/if/+page.svelte';
	import ForPage from '../../../zvelte-references/(doc)/tags/for/+page.svelte';
	import SnippetPage from '../../../zvelte-references/(doc)/tags/snippet/+page.svelte';
	import KeyPage from '../../../zvelte-references/(doc)/tags/key/+page.svelte';
</script>

<h2 id="if">{`{% if ... %}`}</h2>

<IfPage />

<h2 id="for">{`{% for ... %}`}</h2>

<ForPage />

<h2 id="snippet">{`{% snippet ... %}`}</h2>

<SnippetPage />

<h2 id="key">{`{% key ... %}`}</h2>

<KeyPage />

<style>
	h2 {
		margin-bottom: 2rem;
	}
</style>
