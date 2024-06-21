<script>
	import Editor from '$lib/components/Editor.svelte';
	import { twig } from '@ssddanbrown/codemirror-lang-twig';
</script>

<Editor
	extensions={[twig()]}
	value={`
{% for name in expression %}...{% endfor %}

{% for index, name in expression %}...{% endfor %}

{% for name in expression #(key) %}...{% endfor %}

{% for index, name in expression #(key) %}...{% endfor %}

{% for name in expression %}...{% else %}...{% endfor %}
`.trim()}
/>

<p>Iterating over lists of values can be done with an for block.</p>

<Editor
	extensions={[twig()]}
	value={`
<h1>Shopping list</h1>
<ul>
	{% for item in items %}
		<li>{{ item.name }} x {{ item.qty }}</li>
	{% endfor %}
</ul>
`.trim()}
/>

<p>
	You can use for blocks to iterate over any objects and array or array-like value — that is, any
	object with a
	<code>length</code> property.
	<br /><br />
	A for block can also specify an index, equivalent to given keys by Objecy.key(...) method:
</p>

<Editor
	extensions={[twig()]}
	value={`
{% for i, item in items %}
	<li>{{ i + 1 }}: {{ item.name }} x {{ item.qty }}</li>
{% endfor %}
`.trim()}
/>

<p>
	If a <code>key</code> expression is provided — which must uniquely identify each list item — Svelte
	will use it to diff the list when data changes, rather than adding or removing items at the end. The
	key can be any object, but strings and numbers are recommended since they allow identity to persist
	when the objects themselves change.
</p>

<Editor
	extensions={[twig()]}
	value={`
{% for item in items #(item.id) %}
	<li>{{ item.name }} x {{ item.qty }}</li>
{% endfor %}

<!-- or with additional index value -->
{% for i, item in items #(item.id)}
	<li>{{ i + 1 }}: {{ item.name }} x {{ item.qty }}</li>
{% endfor %}
`.trim()}
/>

<p>
	An each block can also have an <code>{'{:else}'}</code> clause, which is rendered if the list is empty.
</p>

<Editor
	extensions={[twig()]}
	value={`
{% for todo in todos}
	<p>{{ todo.text }}</p>
{% else %}
	<p>No tasks today!</p>
{% endfor %}
`.trim()}
/>

<h2>The <code>loop</code> variable</h2>

<p>
	Inside of a <code>for</code> loop block you can access some special variables:
</p>

<ul>
	<li><code>loop.index</code> The current iteration of the loop. (1 indexed)</li>
	<li><code>loop.index0</code> The current iteration of the loop. (0 indexed)</li>
	<li><code>loop.revindex</code> The number of iterations from the end of the loop (1 indexed)</li>
	<li><code>loop.revindex0</code> The number of iterations from the end of the loop (0 indexed)</li>
	<li><code>loop.first</code> True if first iteration</li>
	<li><code>loop.last</code> True if last iteration</li>
	<li><code>loop.length</code> The number of items in the sequence</li>
	<li><code>loop.parent</code> The parent context</li>
</ul>

<Editor
	extensions={[twig()]}
	value={`
{% for user in users %}
    {{ loop.index }} - {{ user.username }}
{% endfor %}
`.trim()}
/>
