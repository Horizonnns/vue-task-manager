<script setup>
import AppSelect from './ui/AppSelect.vue';

const navigation = [
	{ title: 'firstNav', href: '/' },
	{ title: 'secondNav', href: '/tasks' },
];
</script>

<template>
	<header class="bg-blue-20 text-white py-3">
		<div class="container flex items-center justify-between">
			<router-link to="/">
				<h2
					class="text-xl font-bold hover:text-white/80 duration-200 select-none"
				>
					{{ $t('logo') }}
				</h2>
			</router-link>

			<nav class="flex items-center space-x-4 text-sm">
				<ul v-for="nav in navigation" :key="nav">
					<li>
						<button>
							<router-link :to="nav.href">
								{{ $t(nav.title) }}
							</router-link>
						</button>
					</li>
				</ul>

				<AppSelect />
			</nav>
		</div>
	</header>
</template>
