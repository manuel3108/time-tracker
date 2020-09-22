<script lang="ts">
	import TimeInputComponent from "./TimeInputComponent.svelte";
	import { DateTime } from 'luxon'

	export let from: string;
	export let to: string;

	function nowAsString() {
		let dt = DateTime.local();
		return dt.toFormat('HH:mm')
	}

	function fromNow() {
		from = nowAsString();
	}

	function toNow() {
		to = nowAsString();
	}
</script>

<div class="timespan">
	<span>from</span>
	<TimeInputComponent bind:time="{from}"></TimeInputComponent>
	<button class="button is-primary is-small now" on:click={fromNow}>Now</button>
	<span>to</span>
	<TimeInputComponent bind:time="{to}"></TimeInputComponent>
	<button class="button is-primary is-small now" on:click={toNow}>Now</button>
</div>