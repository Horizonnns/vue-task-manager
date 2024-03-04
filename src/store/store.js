import { defineStore } from 'pinia';

export const useTaskStore = defineStore({
	id: 'taskManager',
	state: () => ({ tasks: [], nextId: 1, darkMode: false }),
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
			localStorage.setItem('darkMode', JSON.stringify(this.darkMode));
		},

		// get from localStorage tasks
		loadFromLocalStorage() {
			const darkMode = JSON.parse(localStorage.getItem('darkMode'));
			this.darkMode = darkMode;

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

		// dark mode toggle
		toggleDarkMode() {
			this.darkMode = !this.darkMode;
			this.saveTasksToLocalStorage();
		},

		// dark/light mode auto switcher depending on time
		autoToggleDarkMode() {
			const currentHour = new Date().getHours();
			this.darkMode = currentHour < 6 || currentHour >= 18;
			this.saveTasksToLocalStorage();
		},
	},
});
