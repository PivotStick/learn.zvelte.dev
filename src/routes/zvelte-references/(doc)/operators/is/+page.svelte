<script>
	import Editor from '$lib/components/Editor.svelte';
	import { twig } from '@ssddanbrown/codemirror-lang-twig';
</script>

<p>
	The <code>is</code> operator performs tests. Tests can be used to test a variable against a common
	expression. The right operand is name of the test:
</p>

<h2>defined</h2>

<p>
	<code>defined</code> checks if a variable is defined in the current context. This is very useful
	if you use the <code>strict_variables</code> option:
</p>

<Editor
	extensions={[twig()]}
	value={`
<!-- defined works with variable names -->
{% if foo is defined %}
    ...
{% endif %}

<!-- and attributes on variables names -->
{% if foo.bar is defined %}
    ...
{% endif %}

{% if foo['bar'] is defined %}
    ...
{% endif %}
`.trim()}
/>

<p>
	When using the <code>defined</code> test on an expression that uses variables in some method calls,
	be sure that they are all defined first:
</p>

<Editor
	extensions={[twig()]}
	value={`
{% if var is defined and foo.method(var) is defined %}
    ...
{% endif %}
`.trim()}
/>

<h2>null</h2>

<h2>empty</h2>

<p>
	<code>empty</code> checks if a variable is an empty array, an empty object or falsy (0, "", false,
	null, undefined)
</p>

<Editor
	extensions={[twig()]}
	value={`
{% if foo is empty %}
    ...
{% endif %}
`.trim()}
/>

<p>Everything else will result in a simple "===" check</p>

<Editor
	extensions={[twig()]}
	value={`
{{ var is null }}

{{ 2 == "2" }}
<!-- outputs true -->

{{ 2 is "2" }}
<!-- outputs false -->
`.trim()}
/>
