<script lang="ts">
	import levelData from "../../static/levels/2.json";
	import { Level } from "../core/level";
	import Tile from "../components/Tile.svelte";
	import Plate from "../components/Plate.svelte";
	import BlockGroup from "../components/BlockGroup.svelte";
	import { theme } from "../theme";
	import cssVars from "svelte-css-vars";

	const id = 1;
	const level = new Level(levelData as any);
	const scale = 64;
</script>

<main use:cssVars={$theme}>
	<h1>Level {id}</h1>
	<a href="/">home</a>
	<a href="/play">levels</a>
	<div class="map" style="width: {level.size.x * scale}px; height: {level.size.y * scale}px">
		{#each level.tiles as [tile, pos]}
			<div
				class="cell"
				style="
				width: {scale}px;
				height: {scale}px;
				top: {pos.y * scale}px;
				left: {pos.x * scale}px;"
			>
				<Tile {tile} />
			</div>
		{/each}
		{#each level.plates as [plate, pos]}
			<div
				class="cell"
				style="
				width: {scale}px;
				height: {scale}px;
				top: {pos.y * scale}px;
				left: {pos.x * scale}px;"
			>
				<Plate {plate} />
			</div>
		{/each}
		{#each level.blocks as group}
			<div
				class="cell"
				style="
				width: {scale}px;
				height: {scale}px;
				top: {group.position.y * scale}px;
				left: {group.position.x * scale}px;"
			>
				<BlockGroup {group} />
			</div>
		{/each}
	</div>
</main>

<style>
	main {
		font-family: "Source Code Pro", monospace;
		color: var(--text);
		background-color: var(--background);
		position: absolute;
		width: 100%;
		height: 100%;
	}

	.map {
		margin: auto;
		position: relative;
	}

	.cell {
		position: absolute;
		width: var(--scale);
		height: var(--scale);
		display: flex;
	}
</style>
