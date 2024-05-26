<script>
	import { WebContainer } from '@webcontainer/api';
	import { onMount } from 'svelte';

	/**
	 * @type {HTMLIFrameElement}
	 */
	let iframe;

	onMount(async () => {
		const vm = await WebContainer.boot();

		await vm.mount({
			'index.js': {
				file: {
					contents: `console.log("Yoooo")`
				}
			}
		});

		const process = await vm.spawn('node', ['index.js']);

		process.output.pipeTo(
			new WritableStream({
				write(data) {
					console.log(data);
				}
			})
		);
	});
</script>

<iframe title="Output" src="" bind:this={iframe}></iframe>
