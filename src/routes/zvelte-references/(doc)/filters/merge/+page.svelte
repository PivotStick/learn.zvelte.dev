<script>
	import Editor from '$lib/components/Editor.svelte';
	import { twig } from '@ssddanbrown/codemirror-lang-twig';
	import Args from '../Args.svelte';
	import Page from '../abs/+page.svelte';
</script>

<p>
	The <code>merge</code> filter merges an array with another array:
</p>

<Editor
	extensions={[twig()]}
	value={`
{% set values = [1, 2] %}

{% set values = values|merge(['apple', 'orange']) %}

{# values now contains [1, 2, 'apple', 'orange'] #}
`.trim()}
/>

<p>
	New values are added at the end of the existing ones.
	<br />
	The <code>merge</code> filter also works on literal objects:
</p>

<Editor
	extensions={[twig()]}
	value={`
{% set items = {'apple': 'fruit', 'orange': 'fruit', 'peugeot': 'unknown'} %}

{% set items = items|merge({ 'peugeot': 'car', 'renault': 'car' }) %}

{# items now contains {'apple': 'fruit', 'orange': 'fruit', 'peugeot': 'car', 'renault': 'car'} #}
`.trim()}
/>

<blockquote>
	<p>
		Internally, Zvelte uses the PHP <a href="https://www.php.net/array_merge">array_merge</a> function.
		It supports Traversable objects by transforming those to arrays.
	</p>
</blockquote>
