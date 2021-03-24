<script lang="ts">
	import { onMount } from "svelte";

	import TaskComponent from "../components/TaskComponent.svelte";
	import Task from "../scripts/Task";
	import TimeSpan from "../scripts/TimeSpan";
	import { tasks } from "../stores/tasks";
	import { DateTime, Duration } from "luxon";

	let totalDuration = Duration.fromMillis(0);

	$: $tasks, overallDuration();

	onMount(() => {
		// Enable navigation prompt
		window.onbeforeunload = function () {
			return true;
		};
	});

	function overallDuration() {
		totalDuration = Duration.fromMillis(0);
		$tasks.forEach((task) => {
			task.timespans.forEach((ts) => {
				if (ts.from !== "" && ts.to !== "") {
					var from = DateTime.fromFormat(ts.from, "HH:mm");
					var to = DateTime.fromFormat(ts.to, "HH:mm");
					let d = to.diff(from);
					totalDuration = totalDuration.plus(d);
				}
			});
		});
	}

	function addTask() {
		let t = new Task();
		t.timespans.push(TimeSpan.fromNow());
		$tasks.push(t);
		$tasks = $tasks;
	}
</script>

<div class="main">
	<span>Total working time {totalDuration.toFormat("hh:mm")}</span>
	<div class="tasks">
		{#each $tasks as task, i}
			{#if $tasks.length - 1 === i}
				<TaskComponent bind:task focus={true} />
			{:else}
				<TaskComponent bind:task focus={false} />
			{/if}
		{/each}
	</div>
	<div class="add-task">
		<button class="button is-primary" on:click={addTask}
			>Add new Task</button
		>
	</div>
</div>

<style>
	.main {
		padding: 20px;
	}

	.add-task {
		margin-top: 20px;
	}
</style>
