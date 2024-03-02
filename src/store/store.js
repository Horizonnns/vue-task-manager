import { defineStore } from 'pinia';

export const useTaskStore = defineStore({
	id: 'taskManager',
	state: () => ({ tasks: [], nextId: 1 }),
	actions: {
		// adding task
		addTask(task) {
			task.id = this.nextId++;

			const newTask = {
				...task,
			};

			this.tasks.push(newTask);
			this.saveTasksToLocalStorage();
		},

		// save to localStorage tasks
		saveTasksToLocalStorage() {
			localStorage.setItem('tasks', JSON.stringify(this.tasks));
			localStorage.setItem('nextId', this.nextId);
		},

		// get from localStorage tasks
		loadTasksFromLocalStorage() {
			const tasksFromLocalStorage = JSON.parse(
				localStorage.getItem('tasks') || '[]'
			);
			this.tasks = tasksFromLocalStorage;

			this.nextId = parseInt(localStorage.getItem('nextId')) || 1;
		},
	},
});
