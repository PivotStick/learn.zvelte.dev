<script>
	import Editor from '$lib/components/Editor.svelte';
	import { twig } from '@ssddanbrown/codemirror-lang-twig';
	import Args from '../Args.svelte';
</script>

<p>
	The <code>map</code> filter applies an arrow function to the elements of a sequence or a mapping.
	<br />
	The arrow function receives the value of the sequence or mapping:
</p>

<Editor
	extensions={[twig()]}
	value={`
{% set people = [
    {first: "Bob", last: "Smith"},
    {first: "Alice", last: "Dupond"},
] %}

{{ people|map(p => p.first ~ " " ~ p.last)|join(', ') }}
{# outputs Bob Smith, Alice Dupond #}
`.trim()}
/>

<p>The arrow function also receives the key as a second argument:</p>

<Editor
	extensions={[twig()]}
	value={`
{% set people = {
    "Bob": "Smith",
    "Alice": "Dupond",
} %}

{{ people|map((value, key) => key ~ " " ~ value)|join(', ') }}
{# outputs Bob Smith, Alice Dupond #}
`.trim()}
/>

<blockquote>
	<p>Note that the arrow function has access to the current context.</p>
	<p>
		Literally just calls the <a
			href="https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/map"
			>Array.prototype.map()</a
		> method in Javascript.
	</p>
</blockquote>

<Args arrow="The arrow function" />
