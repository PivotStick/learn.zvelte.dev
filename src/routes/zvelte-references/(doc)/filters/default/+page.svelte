<script>
	import Editor from '$lib/components/Editor.svelte';
	import { twig } from '@ssddanbrown/codemirror-lang-twig';
	import Args from '../Args.svelte';
</script>

<p>
	The <code>default</code> filter returns the passed default value if the value is undefined or empty,
	otherwise the value of the variable:
</p>

<Editor
	extensions={[twig()]}
	value={`
{{ var|default('var is not defined') }}

{{ var.foo|default('foo item on var is not defined') }}

{{ var['foo']|default('foo item on var is not defined') }}

{{ ''|default('passed var is empty')  }}
`.trim()}
/>

<p>
	When using the <code>default</code> filter on an expression that uses variables in some method
	calls, be sure to use the <code>default</code> filter whenever a variable can be undefined:
</p>

<Editor extensions={[twig()]} value={`{{ var.method(foo|default('foo'))|default('foo') }}`} />

<p>
	Using the <code>default</code> filter on a boolean variable might trigger unexpected behavior, as false
	is treated as an empty value. Consider using ?? instead:
</p>

<Editor
	extensions={[twig()]}
	value={`
{% set foo = false %}
{{ foo|default(true) }} <!-- true -->
{{ foo ?? true }} <!-- false -->
`.trim()}
/>

<blockquote>
	<p>
		Read the documentation for the <a href="/zvelte-references">defined</a> and
		<a href="/zvelte-references">empty</a> tests to learn more about their semantics.
	</p>
</blockquote>

<Args default="The default value" />
