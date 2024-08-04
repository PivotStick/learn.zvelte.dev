<script>
	import Editor from '$lib/components/Editor.svelte';
	import { twig } from '@ssddanbrown/codemirror-lang-twig';
</script>

<p>
	The <code>capitalize</code> filter capitalizes a value. The first character will be uppercase, all
	others lowercase:
</p>

<Editor
	extensions={[twig()]}
	value={`
{{ 'my first car'|capitalize }}

<!-- outputs 'My first car' -->
`.trim()}
/>
