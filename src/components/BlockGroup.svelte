<script lang="ts">
	import type { BlockGroup } from "../core/blockgroup";
	import { fade } from "svelte/transition";
	export let group: BlockGroup;
	const delay = Math.random() * 200;
	const duration = Math.random() * 200 + 100;
</script>

<div class="group color-{group.shape[0][1].color}" in:fade={{ delay, duration }} />

<style>
	.group {
		flex: 1;
		margin: 15%;
		border-radius: 20%;
		opacity: 0.6;
		background-color: var(--background);
		box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
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
