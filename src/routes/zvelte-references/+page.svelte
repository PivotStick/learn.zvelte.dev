<script>
	let sections = [
		{
			name: 'Tags',
			slug: 'tags',
			items: [
				{
					name: 'if',
					slug: 'if',
					wip: true
				},
				{
					name: 'for',
					slug: 'for',
					wip: true
				},
				{
					name: 'set',
					slug: 'set',
					wip: true
				},
				{
					name: 'snippet',
					slug: 'snippet'
				},
				{
					name: 'key',
					slug: 'key',
					wip: true
				}
			]
		},
		{
			name: 'Special Tags',
			slug: 'special-tags',
			items: [
				{
					name: '@html',
					slug: 'html',
					wip: true
				},
				{
					name: '@render',
					slug: 'render',
					wip: true
				}
			]
		},
		{
			name: 'Filters',
			slug: 'filters',
			items: [
				{
					name: 'abs',
					slug: 'abs'
				},
				{
					name: 'batch',
					slug: 'batch'
				},
				{
					name: 'capitalize',
					slug: 'capitalize'
				},
				{
					name: 'column',
					slug: 'column'
				},
				{
					name: 'default',
					slug: 'default'
				},
				{
					name: 'filter',
					slug: 'filter'
				},
				{
					name: 'first',
					slug: 'first'
				},
				{
					name: 'format',
					slug: 'format'
				},
				{
					name: 'join',
					slug: 'join'
				},
				{
					name: 'json_encode',
					slug: 'json_encode'
				},
				{
					name: 'keys',
					slug: 'keys'
				},
				{
					name: 'last',
					slug: 'last'
				},
				{
					name: 'length',
					slug: 'length'
				},
				{
					name: 'lower',
					slug: 'lower'
				},
				{
					name: 'map',
					slug: 'map'
				},
				{
					name: 'merge',
					slug: 'merge'
				},
				{
					name: 'nl2br',
					slug: 'nl2br'
				},
				{
					name: 'slice',
					slug: 'slice'
				},
				{
					name: 'split',
					slug: 'split'
				},
				{
					name: 'trim',
					slug: 'trim'
				},
				{
					name: 'upper',
					slug: 'upper'
				},
				{
					name: 'constant',
					slug: 'constant'
				}
			]
		},
		{
			name: 'Operators',
			slug: 'operators',
			items: [
				{
					name: 'Containment Operator',
					slug: 'in',
					text: '(foo in [...])'
				},
				{
					name: 'Test Operator',
					slug: 'is',
					text: '(foo is empty...)'
				},
				{
					name: 'Math',
					slug: 'math',
					text: '(+, -, /, *)'
				},
				{
					name: 'Logic',
					slug: 'logic',
					text: '(and, or, not, ())',
					wip: true
				},
				{
					name: 'Comparisons',
					slug: 'comparisons',
					text: '(==, !=, <, >, >=, <=)',
					wip: true
				},
				{
					name: 'Others',
					slug: 'others',
					text: '(.., |, ~, [], ?:, ??)',
					wip: true
				}
			]
		},
		{
			name: 'Directives',
			slug: 'directives',
			items: [
				{
					name: 'OnDirective',
					slug: 'on',
					text: '(on:click, on:keyboard...)',
					wip: true
				},
				{
					name: 'BindDirective',
					slug: 'bind',
					text: '(bind:value, bind:innerHTML...)',
					wip: true
				},
				{
					name: 'TransitionDirective',
					slug: 'transition',
					text: '(transition:slide, in:scale, out:fly...)',
					wip: true
				},
				{
					name: 'ClassDirective',
					slug: 'class',
					text: '(class:name...)',
					wip: true
				},
				{
					name: 'UseDirective',
					slug: 'use',
					text: '(use:clickoutside...)',
					wip: true
				},
				{
					name: 'UseDirective',
					slug: 'use',
					text: '(use:clickoutside...)',
					wip: true
				}
			]
		}
	];
</script>

<div class="page">
	{#each sections as section}
		<section>
			<h1>{section.name}</h1>
			<ul>
				{#each section.items as item}
					<li>
						<a
							aria-disabled={item.wip ? 'true' : undefined}
							href="/zvelte-references/{section.slug}/{item.slug}"
						>
							{item.name}
						</a>
						{#if 'text' in item && item.text}
							<p>{item.text}</p>
						{/if}
						{#if item.wip}
							<p class="wip">DOC in progress</p>
						{/if}
					</li>
				{/each}
			</ul>
		</section>
	{/each}
</div>

<style lang="scss">
	.page {
		padding: var(--page-spacing);

		display: flex;
		flex-direction: column;
		gap: 6rem 0;
		flex-wrap: wrap;
		height: 100%;
	}

	section {
		h1 {
			margin-bottom: 1rem;
		}

		ul {
			li {
				display: flex;
				align-items: baseline;
				gap: 1rem;

				a {
					box-shadow: inset 0 -1px rgb(var(--color-500));
					margin-bottom: 0.5rem;
					opacity: 0.75;

					&:hover {
						opacity: 1;
					}

					&[aria-disabled='true'] {
						pointer-events: none;
						opacity: 0.5;
					}
				}

				p {
					&.wip {
						font-style: italic;
						opacity: 0.5;

						&::before {
							content: '~ ';
						}
					}
				}
			}
		}
	}
</style>
