<script>
	import Editor from '$lib/components/Editor.svelte';
	import { twig } from '@ssddanbrown/codemirror-lang-twig';
</script>

<p>
	The <code>lower</code> filter converts a value to lowercase:
</p>

<Editor
	extensions={[twig()]}
	value={`
{{ 'WELCOME'|lower }}

<!-- outputs 'welcome' -->
`.trim()}
/>
