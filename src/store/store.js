import { createPinia, defineStore } from 'pinia';

export const useTaskStore = defineStore({
	id: 'taskManager',
	state: () => ({ tasks: [] }),
	actions: {
		addTask(task) {
			const newTask = {
				...task,
				created_at: Date.now(),
			};
			this.tasks.push(newTask);
		},
	},
});

export const pinia = createPinia();
