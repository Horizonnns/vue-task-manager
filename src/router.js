import { createWebHistory, createRouter } from 'vue-router';
import TasksPage from './pages/TasksPage.vue';
import MainPage from './pages/MainPage.vue';

const routes = [
	{ path: '/tasks', component: TasksPage },
	{ path: '/', component: MainPage },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
