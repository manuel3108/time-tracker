<script lang="ts">
	import TimeInputComponent from "./TimeInputComponent.svelte";
	import TimeSpanComponent from "./TimeSpanComponent.svelte";
	import TimeSpan from '../scripts/TimeSpan';
	import Task from "../scripts/Task";
	import { tasks } from "../stores/tasks";
	import { onMount } from "svelte";

	export let task: Task;
	export let focus: boolean;

	let nameElement: HTMLInputElement;

	onMount(() => {
		if(focus) {
			nameElement.focus();
		}
	});

	function addTimeSpan() {
		let ts = TimeSpan.fromNow();
		task.timespans.push(ts);
		$tasks = $tasks;
	}
</script>

<style>
	.task {
		border: 1px solid #505050;
		padding: 10px;
	}

	.name {
		width: 100%;
	}
</style>

<div class="task">
	<div class="columns">
		<div class="column">
			<div class="name-wrapper">
				<input bind:this={nameElement} class="name" bind:value={task.name} />
			</div>
		</div>
		<div class="column">
			<div class="times">
				{#each task.timespans as timespan}
					<TimeSpanComponent bind:from={timespan.from} bind:to={timespan.to}></TimeSpanComponent>					
				{/each}
			</div>
			<div class="add-time">
				<button class="button is-primary add-timespan-button" on:click={addTimeSpan}>+</button>
			</div>
		</div>
	</div>
</div>
