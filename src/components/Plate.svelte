<script lang="ts">
	import type { Plate } from "../core/entity/plate";
	export let plate: Plate;
	const color = plate.color;
</script>

<div class="plate color-{color}" />

<style>
	.plate {
		flex: 1;
		margin: 35%;
		opacity: 0.6;
		border-radius: 30%;
		box-shadow: 0.5px 0.5px 2px rgba(0, 0, 0, 0.5);
	}

	.color-0 {
		background-color: var(--color0);
	}
	.color-1 {
		background-color: var(--color1);
	}
	.color-2 {
		background-color: var(--color2);
	}
	.color-3 {
		background-color: var(--color3);
	}
	.color-4 {
		background-color: var(--color4);
	}
</style>
