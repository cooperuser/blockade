<script lang="ts">
  import { Link } from "svelte-routing";

	export let id: string;
</script>

<div>
	<Link to="levels">home</Link>
	Play {id}
</div>
