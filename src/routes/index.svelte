<script lang="ts">
	import { fade, fly, type FlyParams } from "svelte/transition";
	import "@fontsource/source-code-pro";
	import cssVars from "svelte-css-vars";
	import { theme } from "../theme";
	const distance = 40,
		delay = 100;
	const blockade: [string, FlyParams][] = [
		["「", { x: -distance, delay: delay * 5 }],
		["B", { y: +distance, delay: delay * 0 }],
		["l", { y: -distance, delay: delay * 1 }],
		["o", { y: +distance, delay: delay * 2 }],
		["c", { y: -distance, delay: delay * 3 }],
		["k", { y: +distance, delay: delay * 4 }],
		["a", { y: -distance, delay: delay * 5 }],
		["d", { y: +distance, delay: delay * 6 }],
		["e", { y: -distance, delay: delay * 7 }],
		["」", { x: +distance, delay: delay * 9 }]
	];
</script>

<main use:cssVars={$theme}>
	<div class="title">
		{#each blockade as [char, f]}
			<span class="letter" in:fly={f}>{char}</span>
		{/each}
	</div>
	<div class="menu-buttons">
		<a href="/levels" in:fade={{ delay: delay * 1 }}>play</a>
		<a href="/editor" in:fade={{ delay: delay * 3 }}>editor</a>
		<a href="/settings" in:fade={{ delay: delay * 5 }}>settings</a>
		<div class="button-row">
			<a href="/about" in:fade={{ delay: delay * 7 }}>about</a>
			<a href="/" in:fade={{ delay: delay * 9 }}>exit</a>
			<div />
		</div>
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

	.title {
		margin-top: 10%;
		text-align: center;
		font-size: 5em;
		font-weight: bold;
		user-select: none;
	}

	.title .letter {
		display: inline-block;
	}

	.button-row {
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.menu-buttons {
		display: flex;
		justify-content: left;
		flex-direction: column;
		margin: 10%;
	}

	.menu-buttons a {
		flex: 1;
		margin: 10px;
		padding: 2%;
		border-radius: 5px;
		font-size: 1.5em;
		color: var(--text);
		text-align: center;
		text-decoration: none;
		background-color: var(--color0_tile);
		box-shadow: 1px 1px 1px #00000080;
		transition: color 0.2s, background-color 0.2s, box-shadow 0.2s, transform 0.2s;
	}

	.menu-buttons a:hover {
		transform: translateY(-2px);
		background-color: var(--color1_tile);
		box-shadow: 2px 2px 2px #00000080;
	}

	.menu-buttons a:active {
		transform: translateY(-1px);
		opacity: 0.8;
	}
</style>
