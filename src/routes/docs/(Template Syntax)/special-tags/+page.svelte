<script>
	import { getDocContext } from '../../context.svelte';
	import HTMLDoc from '../../../zvelte-references/(doc)/special-tags/html/+page.svelte';

	const { id } = getDocContext();
</script>

<h2 use:id={'html'}>{`{{ @html ... }}`}</h2>

<HTMLDoc />
