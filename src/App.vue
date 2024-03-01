<script setup>
import Header from './components/Header.vue';
import Main from './pages/MainPage.vue';
import Tasks from './pages/TasksPage.vue';

import { useRoute } from 'vue-router';
const route = useRoute();
</script>

<template>
	<div class="space-y-4">
		<Header />

		<div class="container">
			<Main v-if="route.path === '/'" />

			<Tasks v-if="route.path === '/tasks'" />
		</div>
	</div>
</template>
