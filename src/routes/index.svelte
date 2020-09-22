<script lang="ts">
import { onMount } from "svelte";

	import TaskComponent from "../components/TaskComponent.svelte";
	import Task from '../scripts/Task'
	import TimeSpan from "../scripts/TimeSpan";
	import { tasks } from '../stores/tasks'

	onMount(() => {
		// Enable navigation prompt
		window.onbeforeunload = function() {
			return true;
		};
	});

	function addTask() {
		let t = new Task();
		t.timespans.push(TimeSpan.fromNow())
		$tasks.push(t);
		$tasks = $tasks;
	}
</script>

<div class="main">
    <div class="tasks">
		{#each $tasks as task, i}
			{#if $tasks.length - 1 === i}
				<TaskComponent bind:task={task} focus={true}></TaskComponent>			
			{:else}
				<TaskComponent bind:task={task} focus={false}></TaskComponent>			
			{/if}

		{/each}
	</div>
	<div class="add-task">
		<button class="button is-primary" on:click={addTask}>Add new Task</button>
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