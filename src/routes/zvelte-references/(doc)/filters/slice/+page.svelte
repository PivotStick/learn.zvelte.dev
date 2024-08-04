<script>
	import Editor from '$lib/components/Editor.svelte';
	import { twig } from '@ssddanbrown/codemirror-lang-twig';
	import Args from '../Args.svelte';
</script>

<p>
	The <code>slice</code> filter extracts a slice of an array or a string:
</p>

<Editor
	extensions={[twig()]}
	value={`
{% for i in [1, 2, 3, 4, 5]|slice(1, 2) %}
    <!-- will iterate over 2 and 3 -->
{% endfor %}

{{ '12345'|slice(1, 2) }}

<!-- outputs 23 -->
`.trim()}
/>

<p>You can use any valid expression for both the start and the length:</p>

<Editor
	extensions={[twig()]}
	value={`
{% for i in [1, 2, 3, 4, 5]|slice(start, length) %}
    <!-- ... -->
{% endfor %}
`.trim()}
/>

<p>
	The <code>slice</code> filter works as the
	<a href="https://www.php.net/array_slice">array_slice</a> PHP function for arrays and
	<a href="https://www.php.net/mb-substr">mb_substr</a> for strings with a fallback to
	<a href="https://www.php.net/substr">substr</a>.
</p>

<p>
	If the start is non-negative, the sequence will start at that start in the variable. If start is
	negative, the sequence will start that far from the end of the variable.
</p>

<p>
	If length is given and is positive, then the sequence will have up to that many elements in it. If
	the variable is shorter than the length, then only the available variable elements will be
	present. If length is given and is negative then the sequence will stop that many elements from
	the end of the variable. If it is omitted, then the sequence will have everything from offset up
	until the end of the variable.
</p>

<p>
	The argument <code>preserve_keys</code> is used to reset the index during the loop.
</p>

<Editor
	extensions={[twig()]}
	value={`
{% for key, value in [1, 2, 3, 4, 5]|slice(1, 2, true) %}
    {{ key }} - {{ value }}
{% endfor %}

<!--
    1 - 2
    2 - 3
-->

{% for key, value in [1, 2, 3, 4, 5]|slice(1, 2) %}
    {{ key }} - {{ value }}
{% endfor %}

<!--
    0 - 2
    1 - 3
-->
`.trim()}
/>

<Args
	start="The start of the slice"
	length="The size of the slice"
	preserve_keys="Whether to preserve key or not (when the input is an array), by default the value is false."
/>
