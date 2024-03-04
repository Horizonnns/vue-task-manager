<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useTaskStore } from '@/store/store';

import Header from '@/components/Header.vue';
import Main from '@/pages/MainPage.vue';
import Tasks from '@/pages/TasksPage.vue';
import Notify from '@/components/ui/Notify.vue';

const route = useRoute();
const taskStore = useTaskStore();

onMounted(() => {
	taskStore.loadFromLocalStorage();
	taskStore.autoToggleDarkMode();
});
</script>

<template>
	<section>
		<Header />

		<Notify class="fixed top-16 z-20" />

		<Main v-if="route.path === '/'" />

		<Tasks v-if="route.path === '/tasks'" />
	</section>
</template>
