<script>
	import Editor from '$lib/components/Editor.svelte';
	import { twig } from '@ssddanbrown/codemirror-lang-twig';
</script>

<p>
	The <code>json_encode</code> filter returns the JSON representation of a value:
</p>

<Editor extensions={[twig()]} value={`{{ data|json_encode() }}`} />

<blockquote>
	<p>
		Internally, Zvelte uses the PHP <a target="_blank" href="https://www.php.net/json_encode">
			json_encode
		</a>
		function and the JavaScript
		<a
			target="_blank"
			href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify"
		>
			JSON.stringify()
		</a> method
	</p>
</blockquote>
