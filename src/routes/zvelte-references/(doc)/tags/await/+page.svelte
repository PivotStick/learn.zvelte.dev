<script>
	import Editor from '$lib/components/Editor.svelte';
	import { twig } from '@ssddanbrown/codemirror-lang-twig';

	const promisehref =
		'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise';
</script>

<Editor
	extensions={[twig()]}
	value={`
{% await expression %}...{% then name %}...{% catch name %}...{% await %}

{% await expression %}...{% then name %}...{% await %}

{% await expression then name %}...{% await %}

{% await expression catch name %}...{% await %}
`.trim()}
/>

<p>
	Await blocks allow you to branch on the three possible states of a <a
		href={promisehref}
		target="_blank">Promise</a
	> — pending, fulfilled or rejected.
</p>

<Editor
	extensions={[twig()]}
	value={`
{% await promise %}
	<!-- promise is pending -->
	<p>waiting for the promise to resolve...</p>
{% then value %}
	<!-- promise was fulfilled or not a Promise -->
	<p>The value is {{ value }}</p>
{% catch error %}
	<!-- promise was rejected -->
	<p>Something went wrong: {{ error.message }}</p>
{% await %}
`.trim()}
/>

<blockquote>
	<p>
		During server-side rendering, only the pending branch will be rendered. If the provided
		expression is not a <code>Promise</code>, only the <code>:then</code> branch will be rendered, including
		during server-side rendering.
	</p>
</blockquote>

<p>
	The <code>catch</code> block can be omitted if you don’t need to render anything when the promise rejects
	(or no error is possible).
</p>

<Editor
	extensions={[twig()]}
	value={`
{% await promise %}
	<!-- promise is pending -->
	<p>waiting for the promise to resolve...</p>
{% then value %}
	<!-- promise was fulfilled -->
	<p>The value is {{ value }}</p>
{% await %}
`.trim()}
/>

<p>If you don’t care about the pending state, you can also omit the initial block.</p>

<Editor
	extensions={[twig()]}
	value={`
{% await promise then value}
	<p>The value is {{ value }}</p>
{% await %}
`.trim()}
/>

<p>
	Similarly, if you only want to show the error state, you can omit the <code>then</code> block.
</p>

<Editor
	extensions={[twig()]}
	value={`
{% await promise catch error %}
	<p>The error is {{ error }}</p>
{% await %}
`.trim()}
/>
