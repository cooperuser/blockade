<script lang="ts">
	import type { Tile } from "../core/entity/tile";
	import { fade } from "svelte/transition";
	export let tile: Tile;
	const delay = Math.random() * 200;
	const duration = Math.random() * 200 + 100;
</script>

<div class="tile color-{tile.color}" in:fade={{ delay, duration }} />

<style>
	.tile {
		flex: 1;
		margin: 5%;
		box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
	}

	.color-0 {
		background-color: var(--color0_tile);
	}
	.color-1 {
		background-color: var(--color1_tile);
	}
	.color-2 {
		background-color: var(--color2_tile);
	}
	.color-3 {
		background-color: var(--color3_tile);
	}
	.color-4 {
		background-color: var(--color4_tile);
	}
</style>
