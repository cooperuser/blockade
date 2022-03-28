<script lang="ts">
	import { Router, Link, Route } from "svelte-routing";
	import Menu from "./routes/Menu.svelte";
	import About from "./routes/About.svelte";
	import Editor from "./routes/Editor.svelte";
	import Play from "./routes/Play.svelte";
	import Levels from "./routes/Levels.svelte";

	export let url = "";
</script>

<Router url="{url}" >
<div>
	<Route path="play/:id" let:params>
		<Play id={params.id} />
	</Route>
	<Route path="levels" component="{Levels}" />
	<Route path="editor" component="{Editor}" />
	<Route path="about" component="{About}" />
	<Route path="/"><Menu /></Route>
</div>
</Router>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
