<script>
	import Editor from '$lib/components/Editor.svelte';
	import { twig } from '@ssddanbrown/codemirror-lang-twig';
	import Args from '../Args.svelte';
</script>

<p>
	The <code>split</code> filter splits a string by the given delimiter and returns a list of strings:
</p>

<Editor
	extensions={[twig()]}
	value={`
{% set foo = "one,two,three"|split(',') %}
{# foo contains ['one', 'two', 'three'] #}
`.trim()}
/>

<p>
	You can also pass a <code>limit</code> argument:
</p>

<ul>
	<li>
		If <code>limit</code> is positive, the returned array will contain a maximum of limit elements with
		the last element containing the rest of string;
	</li>
	<li>
		If <code>limit</code> is negative, all components except the last -limit are returned;
	</li>
	<li>
		If <code>limit</code> is zero, then this is treated as 1.
	</li>
</ul>

<Editor
	extensions={[twig()]}
	value={`
{% set foo = "one,two,three,four,five"|split(',', 3) %}
{# foo contains ['one', 'two', 'three,four,five'] #}
`.trim()}
/>

<p>
	If the <code>delimiter</code> is an empty string, then value will be split by equal chunks. Length
	is set by the <code>limit</code> argument (one character by default).
</p>

<Editor
	extensions={[twig()]}
	value={`
{% set foo = "123"|split('') %}
{# foo contains ['1', '2', '3'] #}

{% set bar = "aabbcc"|split('', 2) %}
{# bar contains ['aa', 'bb', 'cc'] #}
`.trim()}
/>

<blockquote>
	<p>
		Internally, Zvelte uses the PHP <a href="https://www.php.net/explode">explode</a> or
		<a href="https://www.php.net/str_split">str_split</a> (if delimiter is empty) functions for string
		splitting.
	</p>
</blockquote>

<Args delimiter="The delimiter" limit="The limit argument" />
