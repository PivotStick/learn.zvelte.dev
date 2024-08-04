<script>
	import Editor from '$lib/components/Editor.svelte';
	import { twig } from '@ssddanbrown/codemirror-lang-twig';
</script>

<Editor
	extensions={[twig()]}
	value={`
{% key expression %}...{% endkey %}
`.trim()}
/>

<p>
	Key blocks destroy and recreate their contents when the value of an expression changes.
	<br />
	This is useful if you want an element to play its transition whenever a value changes.
</p>

<Editor
	extensions={[twig()]}
	value={`
{% key value %}
	<div transition:fade>{{ value }}</div>
{% endkey %}
`.trim()}
/>

<p>When used around components, this will cause them to be reinstantiated and reinitialised.</p>

<Editor
	extensions={[twig()]}
	value={`
{% import Component from "./Component.zvelte" %}

{% key value %}
	<Component />
{% endkey %}
`.trim()}
/>
