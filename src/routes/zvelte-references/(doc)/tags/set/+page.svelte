<script>
	import Editor from '$lib/components/Editor.svelte';
	import { twig } from '@ssddanbrown/codemirror-lang-twig';
</script>

<p>
	Inside code blocks you can also assign values to variables. Assignments use the <code>set</code>
	tag and can have multiple targets.
	<br /><br />
	Here is how you can assign the <code>bar</code> value to the <code>foo</code> variable:
</p>

<Editor extensions={[twig()]} value={"{% set foo = 'bar' %}"} />

<p>
	After the <code>set</code> call, the <code>foo</code> variable is available in the template like any
	other ones:
</p>

<Editor
	extensions={[twig()]}
	value={`
<!-- displays bar -->
{{ foo }}
`.trim()}
/>

<p>The assigned value can be any valid expression:</p>

<Editor
	extensions={[twig()]}
	value={`
The assigned value can be any valid Twig expression:

{% set foo = [1, 2] %}
{% set foo = {'foo': 'bar'} %}
{% set foo = 'foo' ~ 'bar' %}
`.trim()}
/>

<p>Several variables can be assigned in one block:</p>

<Editor
	extensions={[twig()]}
	value={`
{% set foo, bar = 'foo', 'bar' %}

<!-- is equivalent to -->

{% set foo = 'foo' %}
{% set bar = 'bar' %}
`.trim()}
/>

<p>
	The <code>set</code> tag can also be used to 'capture' chunks of text:
</p>

<Editor
	extensions={[twig()]}
	value={`
{% set foo %}
    <div id="pagination">
        ...
    </div>
{% endset %}
`.trim()}
/>

<blockquote>
	<p>
		Note that loops are scoped in Zvelte; therefore a variable declared inside a for loop is not
		accessible outside the loop itself:
	</p>

	<Editor
		extensions={[twig()]}
		value={`
{% for item in list %}
    {% set foo = item %}
{% endfor %}

<!-- foo is NOT available -->
`.trim()}
	/>

	<p>If you want to access the variable, just declare it before the loop:</p>

	<Editor
		extensions={[twig()]}
		value={`
{% set foo = "" %}
{% for item in list %}
    {% set foo = item %}
{% endfor %}

<!-- foo is available -->
`.trim()}
	/>
</blockquote>
