<script setup>
import { ref, computed } from 'vue';
import { useTaskStore } from '@/store/store';
const taskStore = useTaskStore();

const props = defineProps({
	modelValue: String,
	type: {
		type: String,
		default: 'text',
	},
	title: {
		type: [String, Number],
		required: true,
	},
	size: {
		type: String,
		default: 'xl',
	},
	placeholder: {
		type: String,
		default: undefined,
	},
	id: {
		type: [String, Number],
		// onDefault random id for label
		default: () =>
			new Array(5)
				.join()
				.replace(/(.|$)/g, () => ((Math.random() * 36) | 0).toString(36)),
	},
});

const isFocused = ref(false);
const handleFocus = () => {
	isFocused.value = true;
};

const handleBlur = () => {
	isFocused.value = false;
};

// size of input
const size = computed(() => {
	return {
		'px-4 py-2 text-sm': props.size === 'sm',
		'px-4 py-2.5 text-base': props.size === 'base',
	};
});

// update input value
const emit = defineEmits(['update:modelValue']);
const updateValue = (event) => {
	emit('update:modelValue', event.target.value);
};
</script>

<template>
	<div class="relative">
		<input
			:type="type"
			:value="modelValue"
			@input="updateValue"
			@focus="handleFocus"
			@blur="handleBlur"
			:id="id.toString()"
			:class="[
				taskStore.darkMode &&
					'!bg-darkmode-20 !border-darkmode-10 text-gray-50 placeholder:text-gray-600',
				size,
				'block border rounded-lg outline-none font-medium placeholder:font-normal w-full appearance-none focus:outline-none focus:ring-0 focus:!border-blue-10 disabled:bg-gray-50 peer placeholder:text-sm',
			]"
			:placeholder="isFocused ? placeholder : ''"
		/>

		<label
			:for="id"
			:class="{
				'bg-white -translate-y-[50px] peer-placeholder-shown:-translate-y-8 peer-focus:-translate-y-[50px] peer-focus:text-secondary text-gray-500 text-xs':
					props.size === 'sm',

				'bg-white -translate-y-[54px] peer-placeholder-shown:-translate-y-8 peer-focus:-translate-y-[54px] peer-focus:text-secondary text-gray-500 text-sm':
					props.size === 'base',

				'!bg-darkmode-10 peer-focus:text-gray-50 !text-gray-200':
					taskStore.darkMode,
			}"
			class="absolute top-11 left-2 hover:opacity-70 duration-300 rounded-md px-1.5 z-10"
		>
			{{ title }}
		</label>
	</div>
</template>
