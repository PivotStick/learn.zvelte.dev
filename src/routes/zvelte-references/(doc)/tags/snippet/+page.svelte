<script>
	import Editor from '$lib/components/Editor.svelte';
	import { twig } from '@ssddanbrown/codemirror-lang-twig';
</script>

<p>
	Snippets, and <i>render tags</i>, are a way to create chunks markup inside your components.
	Instead of writing duplicate code like this...
</p>

<Editor
	extensions={[twig()]}
	value={`
{% for image in images %}
	{% if image.href %}
		<a href="{{ image.href }}">
			<figure>
				<img
					src="{{ image.src }}"
					alt="{{ image.caption }}"
					width="{{ image.width }}"
					height="{{ image.height }}"
				/>
				<figcaption>{{ image.caption }}</figcaption>
			</figure>
		</a>
	{% else %}
		<figure>
			<img
                src="{{ image.src }}"
                alt="{{ image.caption }}"
                width="{{ image.width }}"
                height="{{ image.height }}"
			/>
            <figcaption>{{ image.caption }}</figcaption>
		</figure>
	{% endif %}
{% endfor %}
`.trim()}
/>

<p>... you can write this:</p>

<Editor
	extensions={[twig()]}
	value={`
{% snippet figure(image) %}
	<figure>
        <img
            src="{{ image.src }}"
            alt="{{ image.caption }}"
            width="{{ image.width }}"
            height="{{ image.height }}"
        />
        <figcaption>{{ image.caption }}</figcaption>
	</figure>
{% endsnippet %}

{% for image in images %}
	{% if image.href %}
		<a href="{{ image.href }}">
            {{ @render figure(image) }}
		</a>
	{% else %}
        {{ @render figure(image) }}
	{% endif %}
{% endfor %}
`.trim()}
/>

<h2>Snippet scope</h2>

<p>
	Snippets can be declared anywhere inside your component. They can reference values declared
	outside themselves, for example in your component's scope or in {'{%'} for ... {'%}'} blocks...
</p>

<Editor
	extensions={[twig()]}
	value={`
{% set message = "it's great to see you!" %}

{% snippet hello(name) %}
	<p>hello {{ name }}! {{ message }}!</p>
{% endsnippet %}

{{ @render hello('alice') }}
{{ @render hello('bob') }}
`.trim()}
/>

<p>Snippets can reference themsvelves and each other:</p>

<Editor
	extensions={[twig()]}
	value={`
{% snippet blastoff() %}
	<span>🚀</span>
{% endsnippet %}

{% snippet countdown(n) %}
	{% if n > 0 %}
		<span>{{n}}...</span>
		{{ @render countdown(n - 1) }}
	{% else %}
		{{ @render blastoff() }}
	{% endif %}
{% endsnippet %}

{{ @render countdown(10)}}
`.trim()}
/>

<h2>Passing snippets to components</h2>

<p>
	Within the template, snippets are values just like any other. As such, they can be passed to
	components as props:
</p>

<Editor
	extensions={[twig()]}
	value={`
{% set fruits = [
    { name: 'apples', qty: 5, price: 2 },
    { name: 'bananas', qty: 10, price: 1 },
    { name: 'cherries', qty: 20, price: 0.5 }
] %}

{% snippet header() %}
	<th>fruit</th>
	<th>qty</th>
	<th>price</th>
	<th>total</th>
{% endsnippet %}

{% snippet row(d) %}
	<td>{{ d.name }}</td>
	<td>{{ d.qty }}</td>
	<td>{{ d.price }}</td>
	<td>{{ d.qty * d.price }}</td>
{% endsnippet %}

<zvelte key="./Table.twig" data="{{ fruits }}" header="{{ header }}" row="{{ row }}" />
`.trim()}
/>

<p>In "./Table.twig"...</p>

<Editor
	extensions={[twig()]}
	value={`
<table>
    {% if header %}
        <thead>
            <tr>{{ @render header() }}</tr>
        </thead>
    {% endif %}
    
    <tbody>
        {% for item in data %}
            <tr>{{ @render row(data) }}</tr>
        {% endfor %}
    </tbody>
</table>
`.trim()}
/>

<p>
	As an authoring convenience, snippets declared directly inside a component implicitly become props
	on the component:
</p>

<Editor
	extensions={[twig()]}
	value={`
{% set fruits = [
    { name: 'apples', qty: 5, price: 2 },
    { name: 'bananas', qty: 10, price: 1 },
    { name: 'cherries', qty: 20, price: 0.5 }
] %}

<!-- this is semantically the same as the above -->

<zvelte key="./Table.twig" data="{{ fruits }}">
    {% snippet header() %}
        <th>fruit</th>
        <th>qty</th>
        <th>price</th>
        <th>total</th>
    {% endsnippet %}

    {% snippet row(d) %}
        <td>{{ d.name }}</td>
        <td>{{ d.qty }}</td>
        <td>{{ d.price }}</td>
        <td>{{ d.qty * d.price }}</td>
    {% endsnippet %}
</zvelte>
`.trim()}
/>

<p>
	Any content inside the component tags that is not a snippet declaration implicitly becomes part of
	the children snippet:
</p>

<Editor
	extensions={[twig()]}
	value={`
<zvelte key="./Table.twig" data="{{ fruits }}">
    <th>fruit</th>
    <th>qty</th>
    <th>price</th>
    <th>total</th>

    {% snippet row(d) %}
        <td>{{ d.name }}</td>
        <td>{{ d.qty }}</td>
        <td>{{ d.price }}</td>
        <td>{{ d.qty * d.price }}</td>
    {% endsnippet %}
</zvelte>
`.trim()}
/>

<p>In "./Table.twig"...</p>

<Editor
	extensions={[twig()]}
	value={`
<table>
    {% if children %}
        <thead>
            <tr>{{ @render children() }}</tr>
        </thead>
    {% endif %}
    
    <tbody>
        {% for item in data %}
            <tr>{{ @render row(data) }}</tr>
        {% endfor %}
    </tbody>
</table>
`.trim()}
/>

<blockquote>
	<p>
		Note that you cannot have a prop called children if you also have content inside the component —
		for this reason, you should avoid having props with that name
	</p>
</blockquote>
