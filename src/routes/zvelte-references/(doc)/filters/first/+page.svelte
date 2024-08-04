<script>
	import Editor from '$lib/components/Editor.svelte';
	import { twig } from '@ssddanbrown/codemirror-lang-twig';
</script>

<p>
	The <code>first</code> filter returns the first "element" of a sequence, a mapping, or a string:
</p>

<Editor
	extensions={[twig()]}
	value={`
{{ [1, 2, 3, 4]|first }}
<!-- outputs 1 -->

{{ {a: 1, b: 2, c: 3, d: 4}|first }}
<!-- outputs 1 -->

{{ '1234'|first }}
<!-- outputs 1 -->
`.trim()}
/>

<blockquote>
	<p>It also works with objects implementing the Traversable interface for PHP.</p>
	<p>
		Zvelte uses the JavaScript
		<a
			target="_blank"
			href="https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Object/keys"
			>Object.keys()</a
		> method over the value to get the first key
	</p>
</blockquote>
