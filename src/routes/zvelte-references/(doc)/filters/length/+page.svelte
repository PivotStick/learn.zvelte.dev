<script>
	import Editor from '$lib/components/Editor.svelte';
	import { twig } from '@ssddanbrown/codemirror-lang-twig';
</script>

<p>
	The <code>length</code> filter returns the number of items of a sequence or mapping, or the length
	of a string.
	<br />
	For objects that implement the Countable interface, length will use the return value of the count()
	method.
	<br />
	For objects that implement the __toString() magic method (and not Countable), it will return the length
	of the string provided by that method.
	<br />
	For objects that implement the Traversable interface, length will use the return value of the iterator_count()
	method.
	<br />
	For strings, <a href="https://www.php.net/manual/function.mb-strlen.php">mb_strlen()</a> is used.
</p>

<p>In Javascript, it will use the "length" property of the given value</p>

<Editor
	extensions={[twig()]}
	value={`
{% if users|length > 10 %}
    ...
{% endif %}
`.trim()}
/>
