<script lang="ts">
	import TimeInputComponent from "./TimeInputComponent.svelte";
	import { DateTime } from 'luxon'
	import { createEventDispatcher } from 'svelte';
	import { tasks } from '../stores/tasks'

	export let from: string;
	export let to: string;

	const dispatch = createEventDispatcher();

	function nowAsString() {
		let dt = DateTime.local();
		return dt.toFormat('HH:mm')
	}

	function fromNow() {
		from = nowAsString();
		inputChanged();
	}

	function toNow() {
		to = nowAsString();
		inputChanged();
	}

	function inputChanged() {
		dispatch("change")
	}

	function removeTimeSpan() {
		$tasks.forEach(t => {
			let tss = t.timespans;
			tss.forEach(ts => {
				if (ts.from == from && ts.to == to) {
					let index = t.timespans.indexOf(ts);
					t.timespans.splice(index, 1);
					$tasks = $tasks;
				}
			})
		})
	}
</script>

<div class="timespan">
	<span>from</span>
	<TimeInputComponent bind:time="{from}" on:change="{inputChanged}"></TimeInputComponent>
	<button class="button is-primary now" on:click={fromNow}>Now</button>
	<span>to</span>
	<TimeInputComponent bind:time="{to}" on:change="{inputChanged}"></TimeInputComponent>
	<button class="button is-primary now" on:click={toNow}>Now</button>
	<button class="button is-primary" on:click={removeTimeSpan}>-</button>
</div>