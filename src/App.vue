<script setup>
import Header from './components/Header.vue';
import Main from './pages/MainPage.vue';
import Tasks from './pages/TasksPage.vue';
import Notify from './components/ui/Notify.vue';

import { useRoute } from 'vue-router';
const route = useRoute();
</script>

<template>
	<section class="space-y-4">
		<Header />

		<Notify class="fixed top-16 z-20" />

		<Main v-if="route.path === '/'" />

		<Tasks v-if="route.path === '/tasks'" />
	</section>
</template>
