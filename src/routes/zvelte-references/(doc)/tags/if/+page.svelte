<script>
	import Editor from '$lib/components/Editor.svelte';
	import { twig } from '@ssddanbrown/codemirror-lang-twig';
</script>

<Editor
	extensions={[twig()]}
	value={`
{% if expression %}...{% endif %}

{% if expression %}...{% elseif expression %}...{% endif %}

{% if expression %}...{% else %}...{% endif %}
`.trim()}
/>

<p>Content that is conditionally rendered can be wrapped in an if block.</p>

<Editor
	extensions={[twig()]}
	value={`
{% if answer == 42 %}
	<p>what was the question?</p>
{% endif %}
`.trim()}
/>

<p>
	Additional conditions can be added with <code>{'{% elseif expression %}'}</code>, optionally
	ending in an {'{% else %}'} clause.
</p>

<Editor
	extensions={[twig()]}
	value={`
{% if porridge.temperature > 100 %}
	<p>too hot!</p>
{% elseif 80 > porridge.temperature %}
	<p>too cold!</p>
{% else %}
	<p>just right!</p>
{% endif %}
`.trim()}
/>

<p>(Blocks don't have to wrap elements, they can also wrap text within elements!)</p>
