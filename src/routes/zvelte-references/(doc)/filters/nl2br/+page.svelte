<script>
	import Editor from '$lib/components/Editor.svelte';
	import { twig } from '@ssddanbrown/codemirror-lang-twig';
</script>

<p>
	The <code>nl2br</code> filter inserts HTML line breaks before all newlines in a string:
</p>

<Editor
	extensions={[twig()]}
	value={`
{{ "I like Tomatoes.\\nYou will like it too."|nl2br }}
<!-- outputs

    I like Tomatoes.<br />
    You will like it too.

-->
`.trim()}
/>
