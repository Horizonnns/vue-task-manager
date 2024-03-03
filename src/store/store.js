import { defineStore } from 'pinia';

export const useTaskStore = defineStore({
	id: 'taskManager',
	state: () => ({ tasks: [], nextId: 1 }),
	actions: {
		// adding task
		addTask(task) {
			task.id = this.nextId++;
			this.tasks.push({ ...task });
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

		// delete task
		removeTask(id) {
			this.tasks = this.tasks.filter((task) => task.id !== id);
			this.saveTasksToLocalStorage();
		},

		// edit task
		editTask(editedTask) {
			this.tasks = this.tasks.map((task) =>
				task.id === editedTask.id ? { ...task, ...editedTask } : task
			);

			this.saveTasksToLocalStorage();
		},
	},
});
