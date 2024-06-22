<script>
	import Editor from '$lib/components/Editor.svelte';
	import { twig } from '@ssddanbrown/codemirror-lang-twig';
</script>

<Editor extensions={[twig()]} value={`{{ @html expression }}`} />

<p>
	In a text expression, characters like <code>{'<'}</code> and <code>{'>'}</code> are escaped;
	however, with HTML expressions, they're not.
	<br />
	<br />
	The expression should be valid standalone HTML —
	<code>{`{{ @html "<div>" }}content{{ @html "</div>" }}`}</code>
	will
	<i>not</i> work, because <code>{'</div>'}</code> is not valid HTML. It also will <i>not</i> compile
	Zvelte code.
</p>

<blockquote>
	<p>
		Zvelte does not sanitize expressions before injecting HTML. If the data comes from an untrusted
		source, you must sanitize it, or you are exposing your users to an <a
			href="https://owasp.org/www-community/attacks/xss/">XSS vulnerability</a
		>
	</p>
</blockquote>

<Editor
	extensions={[twig()]}
	value={`<div class="blog-post">
	<h1>{{ post.title }}</h1>
    {{ @html post.content }}
</div>`}
/>
