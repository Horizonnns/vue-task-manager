<script setup>
import AppSelect from './ui/AppSelect.vue';
import AppDarkLight from './ui/AppDarkLight.vue';
import { useTaskStore } from '../store/store';
const taskStore = useTaskStore();

const navigation = [
	{ title: 'firstNav', href: '/' },
	{ title: 'secondNav', href: '/tasks' },
];
</script>

<template>
	<header
		:class="{ 'bg-darkmode-20': taskStore.darkMode }"
		class="bg-blue-20 text-white duration-500 py-3"
	>
		<div class="container flex items-center justify-between">
			<router-link to="/">
				<h2
					class="text-2xl font-bold hover:text-white/80 duration-200 select-none"
				>
					{{ $t('logo') }}
				</h2>
			</router-link>

			<nav class="flex items-center space-x-4">
				<ul v-for="nav in navigation" :key="nav">
					<li>
						<button class="hover:text-gray-300">
							<router-link :to="nav.href">
								{{ $t(nav.title) }}
							</router-link>
						</button>
					</li>
				</ul>

				<AppSelect />
				<AppDarkLight @click="taskStore.toggleDarkMode()" />
			</nav>
		</div>
	</header>
</template>
