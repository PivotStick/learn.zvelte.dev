<script>
	import Editor from '$lib/components/Editor.svelte';
	import { twig } from '@ssddanbrown/codemirror-lang-twig';
</script>

<p>
	The <code>keys</code> filter returns the keys of an array or object. It is useful when you want to
	iterate over the keys of an array or object:
</p>

<Editor
	extensions={[twig()]}
	value={`
{% for key in array|keys %}
    ...
{% endfor %}
`.trim()}
/>

<blockquote>
	<p>
		Internally, Zvelte uses the PHP <a target="_blank" href="https://www.php.net/array_keys">
			array_keys
		</a>
		function and casts objects to array and uses the JavaScript
		<a
			target="_blank"
			href="https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Object/keys"
			>Object.keys()</a
		> method
	</p>
</blockquote>
