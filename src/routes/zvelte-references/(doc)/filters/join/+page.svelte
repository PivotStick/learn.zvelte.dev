<script>
	import Editor from '$lib/components/Editor.svelte';
	import { twig } from '@ssddanbrown/codemirror-lang-twig';
	import Args from '../Args.svelte';
</script>

<p>
	The <code>join</code> filter returns a string which is the concatenation of the items of a sequence:
</p>

<Editor
	extensions={[twig()]}
	value={`
{{ [1, 2, 3]|join }}
{# returns 123 #}
`.trim()}
/>

<p>
	The separator between elements is an empty string per default, but you can define it with the
	optional first parameter:
</p>

<Editor
	extensions={[twig()]}
	value={`
{{ [1, 2, 3]|join('|') }}
{# outputs 1|2|3 #}
`.trim()}
/>

<p>
	A second parameter can also be provided that will be the separator used between the last two items
	of the sequence:
</p>

<Editor
	extensions={[twig()]}
	value={`
{{ [1, 2, 3]|join(', ', ' and ') }}
{# outputs 1, 2 and 3 #}
`.trim()}
/>

<Args glue="The separator" and="The separator for the last pair of input items" />
