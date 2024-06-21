<script>
	import Editor from '$lib/components/Editor.svelte';
	import { twig } from '@ssddanbrown/codemirror-lang-twig';
	import Args from '../Args.svelte';
</script>

<p>
	The <code>trim</code> filter strips whitespace (or other characters) from the beginning and end of
	a string:
</p>

<Editor
	extensions={[twig()]}
	value={`
{{ '  I like Twig.  '|trim }}

{# outputs 'I like Twig.' #}

{{ '  I like Twig.'|trim('.') }}

{# outputs '  I like Twig' #}

{{ '  I like Twig.  '|trim(side='left') }}

{# outputs 'I like Twig.  ' #}

{{ '  I like Twig.  '|trim(' ', 'right') }}

{# outputs '  I like Twig.' #}
`.trim()}
/>

<Args
	character_mask="The characters to strip"
	side="The default is to strip from the left and the right (`both`) sides, but `left` and `right` will strip from either the left side or right side only"
/>
