<script>
	import Editor from '$lib/components/Editor.svelte';
	import { twig } from '@ssddanbrown/codemirror-lang-twig';
	import Args from '../Args.svelte';
</script>

<p>
	The <code>format</code> filter formats a given string by replacing the placeholders (placeholders
	follows the <a target="_blank" href="https://www.php.net/sprintf">sprintf</a> notation):
</p>

<Editor
	extensions={[twig()]}
	value={`
{{ "I like %s and %s."|format("foo", "bar") }}

<!-- outputs I like foo and if the foo parameter equals to the foo string. -->
`.trim()}
/>

<Args format="The format string" {...{ '...values': 'The used values by the format string' }} />
