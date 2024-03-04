<script setup>
import { useI18n } from 'vue-i18n';
import {
	Listbox,
	ListboxButton,
	ListboxOptions,
	ListboxOption,
} from '@headlessui/vue';
import IconFlagEng from '../icons/IconFlagEng.vue';
import IconFlagRus from '../icons/IconFlagRus.vue';

const { locale } = useI18n();
</script>

<template>
	<Listbox v-model="$i18n.locale">
		<div class="relative mt-1">
			<ListboxButton
				class="flex space-x-2 items-center bg-white px-1.5 py-1 relative rounded-2xl cursor-pointer text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 text-base sm:text-sm"
			>
				<span class="block text-blue-10 font-medium">{{ locale }}</span>

				<div v-if="locale === 'ru'">
					<IconFlagRus />
				</div>

				<div v-if="locale === 'en'">
					<IconFlagEng />
				</div>
			</ListboxButton>

			<ListboxOptions
				class="rounded-xl absolute mt-1 max-h-60 overflow-auto shadow-lg ring-1 ring-black/5 focus:outline-none text-base sm:text-sm"
			>
				<ListboxOption
					v-for="locale in $i18n.availableLocales"
					:key="locale"
					:value="locale"
					:class="{
						'bg-white hover:!bg-amber-100 text-amber-900':
							locale !== $i18n.locale,
						'bg-blue-20 text-white': locale === $i18n.locale,
						'relative flex space-x-2 items-start cursor-pointer select-none py-1.5 px-2': true,
					}"
				>
					<span class="block font-medium">{{ locale }}</span>

					<div v-if="locale === 'ru'">
						<IconFlagRus />
					</div>

					<div v-if="locale === 'en'">
						<IconFlagEng />
					</div>
				</ListboxOption>
			</ListboxOptions>
		</div>
	</Listbox>
</template>
