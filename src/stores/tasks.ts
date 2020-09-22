import { writable } from 'svelte/store'
import Task from '../scripts/Task'

export const tasks = writable(new Array<Task>())