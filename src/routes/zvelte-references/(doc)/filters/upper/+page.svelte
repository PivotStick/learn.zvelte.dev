<script>
	import Editor from '$lib/components/Editor.svelte';
	import { twig } from '@ssddanbrown/codemirror-lang-twig';
</script>

<p>
	The <code>upper</code> filter converts a value to uppercase:
</p>

<Editor
	extensions={[twig()]}
	value={`
{{ 'welcome'|upper }}

<!-- outputs 'WELCOME' -->
`.trim()}
/>
