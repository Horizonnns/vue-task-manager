<script setup>
const navigation = [
	{ title: 'Главная', href: '/' },
	{ title: 'Задачи', href: '/tasks' },
];
</script>

<template>
	<header class="bg-blue-500 border-b border-black/80 text-white py-3">
		<div class="container flex items-center justify-between">
			<router-link to="/">
				<h2
					class="text-xl font-bold hover:text-white/80 duration-200 select-none"
				>
					Task Manager
				</h2>
			</router-link>

			<nav class="flex space-x-2 text-sm">
				<ul v-for="nav in navigation" :key="nav">
					<li>
						<button>
							<router-link :to="nav.href">{{ nav.title }}</router-link>
						</button>
					</li>
				</ul>
			</nav>
		</div>
	</header>
</template>
