<p>Zvelte allows you to do math in templates; the following operators are supported:</p>

<ul>
	<li>
		<code>+</code> Adds two numbers together (the operands are casted to numbers). {'{{ 1 + 1 }}'} is
		2.
	</li>
	<li>
		<code>-</code> Subtracts the second number from the first one. {'{{ 3 - 2 }}'} is 1.
	</li>

	<li>
		<code>/</code> Divides two numbers. The returned value will be a floating point number. {'{{ 1 / 2 }}'}
		is {'{{ 0.5 }}'}.
	</li>

	<li class="wip">
		<code>%</code> Calculates the remainder of an integer division. {'{{ 11 % 7 }}'} is 4.
	</li>

	<li class="wip">
		<code>//</code> Divides two numbers and returns the floored integer result. {'{{ 20 // 7 }}'} is
		2, {'{{ -20 // 7 }}'}
		is -3 (this is just syntactic sugar for the round filter).
	</li>

	<li>
		<code>*</code> Multiplies the left operand with the right one. {'{{ 2 * 2 }}'} would return 4.
	</li>

	<li class="wip">
		<code>**</code> Raises the left operand to the power of the right operand. {'{{ 2 ** 3 }}'} would
		return 8.
	</li>
</ul>

<style lang="scss">
	.wip {
		opacity: 0.3;

		&::after {
			content: ' --- (not implemented yet)';
		}
	}
</style>
