<script>
	import Editor from '$lib/components/Editor.svelte';
	import { twig } from '@ssddanbrown/codemirror-lang-twig';
	import Args from '../Args.svelte';
</script>

<Editor
	extensions={[twig()]}
	value={`
{% set items = [{ 'fruit' : 'apple'}, {'fruit' : 'orange' }] %}

{% set fruits = items|column('fruit') %}

<!-- fruits now contains ['apple', 'orange'] -->
`.trim()}
/>

<blockquote>
	Internally, Zvelte uses the PHP
	<a target="_blank" href="https://www.php.net/array_column"> array_column </a> function and a custom
	algorithm for the JS side
</blockquote>

<Args name="The column name to extract" />
