<script>
	import Editor from '$lib/components/Editor.svelte';
	import { html } from '@codemirror/lang-html';
	import { twig } from '@ssddanbrown/codemirror-lang-twig';
	import Args from '../Args.svelte';
</script>

<p>
	The <code>batch</code> filter "batches" items by returning a list of lists with the given number of
	items. A second parameter can be provided and used to fill in missing items:
</p>

<Editor
	extensions={[twig()]}
	value={`
{% set items = ['a', 'b', 'c', 'd'] %}

<table>
{% for row in items|batch(3, 'No item') %}
    <tr>
        {% for column in row %}
            <td>{{ column }}</td>
        {% endfor %}
    </tr>
{% endfor %}
</table>
`.trim()}
/>

<p>The above example will be rendered as:</p>

<Editor
	extensions={[html()]}
	value={`
<table>
    <tr>
        <td>a</td>
        <td>b</td>
        <td>c</td>
    </tr>
    <tr>
        <td>d</td>
        <td>No item</td>
        <td>No item</td>
    </tr>
</table>
`.trim()}
/>

<Args
	size="The size of the batch; fractional numbers will be rounded up"
	fill="Used to fill in missing items"
	preserve_keys="Whether to preserve keys or not"
/>
