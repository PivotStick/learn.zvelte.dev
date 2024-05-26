/**
 * this file is based on [dataProvider.ts from sveltejs/language-tools](https://github.com/sveltejs/language-tools/blob/master/packages/language-server/src/plugins/html/dataProvider.ts)
 */

export const globalEvents = [
	{ name: 'on:abort' },
	{ name: 'on:animationcancel' },
	{ name: 'on:animationend' },
	{ name: 'on:animationiteration' },
	{ name: 'on:animationstart' },
	{ name: 'on:auxclick' },
	{ name: 'on:beforeinput' },
	{ name: 'on:blur' },
	{ name: 'on:cancel' },
	{ name: 'on:canplay' },
	{ name: 'on:canplaythrough' },
	{ name: 'on:change' },
	{ name: 'on:click' },
	{ name: 'on:close' },
	{ name: 'on:contextmenu' },
	{ name: 'on:copy' },
	{ name: 'on:cuechange' },
	{ name: 'on:cut' },
	{ name: 'on:dblclick' },
	{ name: 'on:drag' },
	{ name: 'on:dragend' },
	{ name: 'on:dragenter' },
	{ name: 'on:dragleave' },
	{ name: 'on:dragover' },
	{ name: 'on:dragstart' },
	{ name: 'on:drop' },
	{ name: 'on:durationchange' },
	{ name: 'on:emptied' },
	{ name: 'on:ended' },
	{ name: 'on:error' },
	{ name: 'on:focus' },
	{ name: 'on:formdata' },
	{ name: 'on:gotpointercapture' },
	{ name: 'on:input' },
	{ name: 'on:invalid' },
	{ name: 'on:keydown' },
	{ name: 'on:keypress' },
	{ name: 'on:keyup' },
	{ name: 'on:load' },
	{ name: 'on:loadeddata' },
	{ name: 'on:loadedmetadata' },
	{ name: 'on:loadstart' },
	{ name: 'on:lostpointercapture' },
	{ name: 'on:mousedown' },
	{ name: 'on:mouseenter' },
	{ name: 'on:mouseleave' },
	{ name: 'on:mousemove' },
	{ name: 'on:mouseout' },
	{ name: 'on:mouseover' },
	{ name: 'on:mouseup' },
	{ name: 'on:paste' },
	{ name: 'on:pause' },
	{ name: 'on:play' },
	{ name: 'on:playing' },
	{ name: 'on:pointercancel' },
	{ name: 'on:pointerdown' },
	{ name: 'on:pointerenter' },
	{ name: 'on:pointerleave' },
	{ name: 'on:pointermove' },
	{ name: 'on:pointerout' },
	{ name: 'on:pointerover' },
	{ name: 'on:pointerup' },
	{ name: 'on:progress' },
	{ name: 'on:ratechange' },
	{ name: 'on:reset' },
	{ name: 'on:resize' },
	{ name: 'on:scroll' },
	{ name: 'on:securitypolicyviolation' },
	{ name: 'on:seeked' },
	{ name: 'on:seeking' },
	{ name: 'on:select' },
	{ name: 'on:selectionchange' },
	{ name: 'on:selectstart' },
	{ name: 'on:slotchange' },
	{ name: 'on:stalled' },
	{ name: 'on:submit' },
	{ name: 'on:suspend' },
	{ name: 'on:timeupdate' },
	{ name: 'on:toggle' },
	{ name: 'on:touchcancel' },
	{ name: 'on:touchend' },
	{ name: 'on:touchmove' },
	{ name: 'on:touchstart' },
	{ name: 'on:transitioncancel' },
	{ name: 'on:transitionend' },
	{ name: 'on:transitionrun' },
	{ name: 'on:transitionstart' },
	{ name: 'on:volumechange' },
	{ name: 'on:waiting' },
	{ name: 'on:webkitanimationend' },
	{ name: 'on:webkitanimationiteration' },
	{ name: 'on:webkitanimationstart' },
	{ name: 'on:webkittransitionend' },
	{ name: 'on:wheel' }
];

/** @type {{ name: string, description?: string }[]} */
export const zvelteEvents = [
	...globalEvents,
	{
		name: 'on:introstart',
		description: 'Available when element has transition'
	},
	{
		name: 'on:introend',
		description: 'Available when element has transition'
	},
	{
		name: 'on:outrostart',
		description: 'Available when element has transition'
	},
	{
		name: 'on:outroend',
		description: 'Available when element has transition'
	}
];

export const zvelteAttributes = [
	{
		name: 'bind:innerHTML',
		description: 'Available when contenteditable=true'
	},
	{
		name: 'bind:textContent',
		description: 'Available when contenteditable=true'
	},
	{
		name: 'bind:innerText',
		description: 'Available when contenteditable=true'
	},
	{
		name: 'bind:clientWidth',
		description: 'Available for block level elements. (read-only)'
	},
	{
		name: 'bind:clientHeight',
		description: 'Available for block level elements. (read-only)'
	},
	{
		name: 'bind:offsetWidth',
		description: 'Available for block level elements. (read-only)'
	},
	{
		name: 'bind:offsetHeight',
		description: 'Available for block level elements. (read-only)'
	},
	{
		name: 'bind:this',
		description:
			'To get a reference to a DOM node, use bind:this. If used on a component, gets a reference to that component instance.'
	}
];

export const zvelteTags = [
	{
		name: 'zvelte:component',
		description:
			'Renders a component dynamically, using the component constructor specified as the this property. When the property changes, the component is destroyed and recreated.\n\nIf this is falsy, no component is rendered.',
		attributes: [
			{
				name: 'this',
				description:
					'Component to render.\n\nWhen this property changes, the component is destroyed and recreated.\nIf this is falsy, no component is rendered.'
			}
		]
	}
];

const mediaAttributes = [
	{
		name: 'bind:duration',
		description: 'The total duration of the video, in seconds. (readonly)'
	},
	{
		name: 'bind:buffered',
		description: 'An array of {start, end} objects. (readonly)'
	},
	{
		name: 'bind:seekable',
		description: 'An array of {start, end} objects. (readonly)'
	},
	{
		name: 'bind:played',
		description: 'An array of {start, end} objects. (readonly)'
	},
	{
		name: 'bind:seeking',
		description: 'boolean. (readonly)'
	},
	{
		name: 'bind:ended',
		description: 'boolean. (readonly)'
	},
	{
		name: 'bind:currentTime',
		description: 'The current point in the video, in seconds.'
	},
	{
		name: 'bind:playbackRate',
		description: "how fast or slow to play the video, where 1 is 'normal'"
	},
	{
		name: 'bind:paused'
	},
	{
		name: 'bind:volume',
		description: 'A value between 0 and 1'
	},
	{
		name: 'bind:muted'
	},
	{
		name: 'bind:readyState'
	}
];

const videoAttributes = [
	{
		name: 'bind:videoWidth',
		description: 'readonly'
	},
	{
		name: 'bind:videoHeight',
		description: 'readonly'
	}
];

const indeterminateAttribute = {
	name: 'indeterminate',
	description: 'Available for type="checkbox"'
};

/** @type {Record<string, { name: string, description?: string }[]>} */
export const addAttributes = {
	select: [{ name: 'bind:value' }],
	input: [
		{ name: 'bind:value' },
		{ name: 'bind:group', description: 'Available for type="radio" and type="checkbox"' },
		{ name: 'bind:checked', description: 'Available for type="checkbox"' },
		{ name: 'bind:files', description: 'Available for type="file" (readonly)' },
		indeterminateAttribute,
		{ ...indeterminateAttribute, name: 'bind:indeterminate' }
	],
	img: [{ name: 'bind:naturalWidth' }, { name: 'bind:naturalHeight' }],
	textarea: [{ name: 'bind:value' }],
	video: [...mediaAttributes, ...videoAttributes],
	audio: [...mediaAttributes],
	details: [
		{
			name: 'bind:open'
		}
	]
};
