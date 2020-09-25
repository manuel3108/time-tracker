<script lang="ts">
	import TimeInputComponent from "./TimeInputComponent.svelte";
	import TimeSpanComponent from "./TimeSpanComponent.svelte";
	import TimeSpan from '../scripts/TimeSpan';
	import Task from "../scripts/Task";
	import { tasks } from "../stores/tasks";
	import { onMount } from "svelte";
	import { DateTime, Duration } from 'luxon'

	export let task: Task;
	export let focus: boolean;

	let nameElement: HTMLInputElement;
	let duration: string = "0";

	onMount(() => {
		if(focus) {
			nameElement.focus();
		}

		calcDuration();
	});

	function addTimeSpan() {
		let ts = TimeSpan.fromNow();
		task.timespans.push(ts);
		$tasks = $tasks;

		calcDuration();
	}
	
	function calcDuration() {
		let totalDuration = Duration.fromMillis(0);

		task.timespans.forEach(ts => {
			if(ts.from !== "" && ts.to !== "") {
				var from = DateTime.fromFormat(ts.from, "HH:mm");
				var to = DateTime.fromFormat(ts.to, "HH:mm");
				let d = to.diff(from);
				totalDuration = totalDuration.plus(d);
			}
		});

		if (totalDuration) {
			duration = totalDuration.toFormat("hh:mm")
		}
	}
</script>

<style>
	.task {
		border: 1px solid #505050;
		padding: 10px;
		margin: 10px;
	}

	.name {
		width: 100%;
	}

	.description-wrapper {
		margin-top: 10px;
	}

	.description {
		width: 100%;
		padding: 6px;
	}
</style>

<div class="task">
	<div class="columns">
		<div class="column is-two-thirds">
			<div class="name-wrapper">
				<input bind:this={nameElement} class="name" bind:value={task.name} />
			</div>
			<div class="description-wrapper">
				<textarea class="description" rows="4" bind:value={task.description} />
			</div>
		</div>
		<div class="column">
			<div class="duration">
				<span>duration: {duration}</span>
			</div>
			<div class="times">
				{#each task.timespans as timespan}
					<TimeSpanComponent bind:from={timespan.from} bind:to={timespan.to} on:change="{calcDuration}"></TimeSpanComponent>					
				{/each}
			</div>
			<div class="add-time">
				<button class="button is-primary add-timespan-button" on:click={addTimeSpan}>+</button>
			</div>
		</div>
	</div>
</div>
