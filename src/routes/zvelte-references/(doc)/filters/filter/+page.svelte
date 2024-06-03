<script>
	import Editor from '$lib/components/Editor.svelte';
	import { twig } from '@ssddanbrown/codemirror-lang-twig';
	import Args from '../Args.svelte';
</script>

<p>
	The <code>filter</code> filter filters elements of a sequence or a mapping using an arrow function.
	The arrow function receives the value of the sequence or mapping:
</p>

<Editor
	extensions={[twig()]}
	value={`
{% set sizes = [34, 36, 38, 40, 42] %}

{{ sizes|filter(v => v > 38)|join(', ') }}
{# output 40, 42 #}
`.trim()}
/>

<p>
	Combined with the <code>for</code> tag, it allows to filter the items to iterate over:
</p>

<Editor
	extensions={[twig()]}
	value={`
{% set sizes = {
    xs: 34,
    s:  36,
    m:  38,
    l:  40,
    xl: 42,
} %}

{% for k, v in sizes|filter(v => v > 38) -%}
    {{ k }} = {{ v }}
{% endfor %}
{# output l = 40 xl = 42 #}
`.trim()}
/>

<p>The arrow function also receives the key as a second argument:</p>

<Editor
	extensions={[twig()]}
	value={`
{% for k, v in sizes|filter((v, k) => v > 38 and k != "xl") -%}
    {{ k }} = {{ v }}
{% endfor %}
{# output l = 40 #}
`.trim()}
/>

<p>Note that the arrow function has access to the current context.</p>

<Args array="The sequence or mapping" arrow="The arrow function" />
