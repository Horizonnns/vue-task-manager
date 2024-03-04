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

// input focus styles
const smFocused = '-translate-y-[52px] bg-white text-xs !text-secondary';
const smNotFocused = '-translate-y-[38px] text-gray-800';
const baseFocused = '-translate-y-[54px] bg-white text-sm !text-secondary';
const baseNotFocused = '-translate-y-[34px] text-gray-800';

// translate title at the input and based on the size
const translate = computed(() => {
	if (props.size === 'sm') {
		return isFocused.value ? smFocused : smNotFocused;
	} else if (props.size === 'base') {
		return isFocused.value ? baseFocused : baseNotFocused;
	}
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
					'!bg-darkmode-20 !border-darkmode-10 text-gray-200 placeholder:text-gray-600',
				size,
				'block border rounded-lg outline-none font-medium placeholder:font-normal w-full appearance-none focus:outline-none focus:ring-0 focus:!border-blue-10 disabled:bg-gray-50 peer dark:bg-transparent',
			]"
			:placeholder="isFocused ? placeholder : ''"
		/>
		<label
			:for="id"
			:class="[
				translate,
				modelValue && props.size === 'sm'
					? 'top-7 -translate-y-[36px] bg-white text-xs !text-secondary'
					: '',

				modelValue && props.size === 'base' ? baseFocused : '',

				'absolute top-11 left-2 hover:opacity-70 duration-300 rounded-md px-1.5 z-10',

				taskStore.darkMode && '!text-gray-200 !bg-darkmode-10',
			]"
		>
			{{ title }}
		</label>
	</div>
</template>
