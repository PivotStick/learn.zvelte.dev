<script>
	import Editor from '$lib/components/Editor.svelte';
	import { twig } from '@ssddanbrown/codemirror-lang-twig';
</script>

<p>
	The <code>in</code> operator performs containment test. It returns <code>true</code> if the left operand
	is contained in the right:
</p>

<Editor
	extensions={[twig()]}
	value={`
{# returns true #}

{{ 1 in [1, 2, 3] }}

{{ 'cd' in 'abcde' }}
`.trim()}
/>

<blockquote>
	<p>You can use this filter to perform a key presence test on objects.</p>
</blockquote>

<p>
	To perform a negative test, use the <code>not in</code> operator:
</p>

<Editor
	extensions={[twig()]}
	value={`
{% if 1 not in [1, 2, 3] %}

{# is equivalent to #}
{% if not (1 in [1, 2, 3]) %}
`.trim()}
/>
