<script>
	import Editor from '$lib/components/Editor.svelte';
	import { twig } from '@ssddanbrown/codemirror-lang-twig';
</script>

<p>
	<code>constant</code> returns the constant value for a given string:
</p>

<Editor
	extensions={[twig()]}
	value={`
<pre>{{ some_object|json_encode(constant('JSON_PRETTY_PRINT')) }}</pre>
`.trim()}
/>
