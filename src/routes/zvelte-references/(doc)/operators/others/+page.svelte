<script>
	import Editor from '$lib/components/Editor.svelte';
	import { twig } from '@ssddanbrown/codemirror-lang-twig';
</script>

<p>The following operators don't fit into any of the other categories:</p>

<ul>
	<li>
		<code>|</code> applies a filter
	</li>

	<li>
		<code>..</code> Creates a sequence based on the operand before and after the operator:

		<Editor
			extensions={[twig()]}
			value={`
{% for i in 1..5 %}{{ i }}{% endfor %}

<!-- is equivalent to -->
{% for i in [1, 2, 3, 4, 5] %}{{ i }}{% endfor %}
`.trim()}
		/>

		<p>
			Note that you must use parentheses when combining it with the filter operator due to the
			operator precedence rules:
		</p>

		<Editor extensions={[twig()]} value={`(1..5)|join(', ')`} />
	</li>

	<li>
		<code>~</code> Converts all operands into strings and concatenates them. {'{{'} "Hello " ~ name ~
		"!" {'}}'} would return (assuming name is 'John') Hello John!.
	</li>

	<li>
		<code>., []</code> Gets an attribute of a variable.
	</li>

	<li>
		<code>?:</code> The ternary operator:

		<Editor
			extensions={[twig()]}
			value={`
{{ foo ? 'yes' : 'no' }}
{{ foo ?: 'no' }} is the same as {{ foo ? foo : 'no' }}
{{ foo ? 'yes' }} is the same as {{ foo ? 'yes' : '' }}
`.trim()}
		/>
	</li>

	<li>
		<code>??</code> The null-coalescing operator:

		<Editor
			extensions={[twig()]}
			value={`
<!-- returns the value of foo if it is defined and not null, 'no' otherwise -->
{{ foo ?? 'no' }}
`.trim()}
		/>
	</li>

	<li class="wip">
		<code>...</code> The spread operator can be used to expand arrays or hashes (it cannot be used
		to expand the arguments of a function call):
		<Editor
			extensions={[twig()]}
			value={`
{% set numbers = [1, 2, ...moreNumbers] %}
{% set ratings = {'foo': 10, 'bar': 5, ...moreRatings} %}
`.trim()}
		/>
	</li>
</ul>

<style lang="scss">
	.wip {
		opacity: 0.3;

		&::after {
			content: ' --- (not implemented yet)';
		}
	}
</style>
