<script>
	import Editor from '$lib/components/Editor.svelte';
	import { twig } from '@ssddanbrown/codemirror-lang-twig';

	let example = `
{# number = -5 #}

{{ number|abs }}

{# outputs 5 #}
`.trim();
</script>

<p>The <code>abs</code> filter returns the absolute value.</p>

<Editor extensions={[twig()]} value={example} />

<blockquote>
	<p>
		Internally, Zvelte will use the <a target="_blank" href="https://www.php.net/abs">abs</a>
		function for PHP and the
		<a
			target="_blank"
			href="https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Math/abs"
		>
			Math.abs()
		</a> method for js
	</p>
</blockquote>
