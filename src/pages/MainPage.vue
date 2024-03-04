<script setup>
import { useTaskStore } from '../store/store';
const taskStore = useTaskStore();

const cardAdvantages = [
	{ title: 'advantages.firtsTitle', descr: 'advantages.firstDescr' },
	{ title: 'advantages.secondTitle', descr: 'advantages.secondDescr' },
	{ title: 'advantages.thirdTitle', descr: 'advantages.thirdDescr' },
];
</script>

<template>
	<main
		:class="[taskStore.darkMode ? 'bg-darkmode-10 text-white' : '']"
		class="space-y-20 duration-500"
	>
		<section class="container">
			<h2 class="text-center text-3xl font-bold leading-6 pt-12 mb-6">
				{{ $t('mainTitle') }}
			</h2>

			<div
				:class="{ 'dark:prose-invert': taskStore.darkMode }"
				class="prose max-w-full space-y-12 duration-500"
			>
				<p>
					{{ $t('firstMainParagraph') }}
				</p>

				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					<div
						v-for="card in cardAdvantages"
						:key="card"
						:class="{ 'bg-darkmode-20 !border-gray-800': taskStore.darkMode }"
						class="shadow-sm rounded-md border duration-500 px-6"
					>
						<img
							src="https://via.placeholder.com/150x150"
							alt="Icon of a list"
						/>

						<h4 class="text-xl font-bold mb-2">{{ $t(card.title) }}</h4>
						<p>{{ $t(card.descr) }}</p>
					</div>
				</div>

				<p>
					{{ $t('secondMainParagraph') }}
				</p>
			</div>
		</section>

		<section
			:class="{ 'bg-darkmode-20': taskStore.darkMode }"
			class="bg-blue-500 text-center py-20"
		>
			<h3 class="text-3xl font-bold text-white mb-8">
				{{ $t('startManaging') }}
			</h3>

			<router-link
				to="/tasks"
				:class="{ 'bg-white text-darkmode-20': taskStore.darkMode }"
				class="bg-white hover:!bg-blue-100 active:!bg-blue-600 active:text-white text-blue-500 py-3 px-6 rounded-md"
			>
				{{ $t('goManaging') }}
			</router-link>
		</section>
	</main>
</template>
