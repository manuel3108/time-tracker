<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let time: string;

	const dispatch = createEventDispatcher();

	function inputChanged() {
		dispatch("change")
	}
</script>

<input type="time" bind:value="{time}" on:change="{inputChanged}">