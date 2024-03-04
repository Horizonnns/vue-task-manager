<script setup>
import { ref } from 'vue';
import { useTaskStore } from '../../store/store';
import { notify } from '../../composables/notify';
import AppInput from './AppInput.vue';
import IconExit from '../icons/IconExit.vue';
import {
	TransitionRoot,
	TransitionChild,
	Dialog,
	DialogPanel,
} from '@headlessui/vue';

const taskStore = useTaskStore();

const props = defineProps({
	isOpen: String,
	actionType: String,
	getTaskWithID: Object,
});

const form = ref({
	id: 1,
	title: '',
	category: '',
	priority: '',
	status: '',
	outdate: '',
	tag: '',
	created_at: Date.now(),
});

// reset-modal-form
const resetModalForm = () => {
	form.value = {
		title: '',
		category: '',
		priority: '',
		status: '',
		outdate: '',
		tag: '',
	};
};

const editedForm = ref({
	title: '',
	category: '',
	priority: '',
	status: '',
	outdate: '',
	tag: '',
});

const emit = defineEmits(['closeModal']);

// сhecking fields
const isFormValid = (formData) => {
	const requiredFields = ['title', 'category', 'priority', 'status', 'tag'];
	return requiredFields.every((field) => formData[field]);
};

// create-new-task
const submitCreatedTask = () => {
	// сhecking for filled-in fields
	if (!isFormValid(form.value)) {
		notify('error', 'Заполните все поля перед созданием задачи');
		return;
	}

	taskStore.addTask(form.value);
	notify('message', 'Задача успешно создано!');
	emit('closeModal');
	resetModalForm();
};

const submitEditedTask = () => {
	// сhecking for filled-in fields
	if (!isFormValid(editedForm.value)) {
		notify('error', 'Заполните все поля перед изменением задачи');
		return;
	}

	taskStore.editTask({ ...props.getTaskWithID, ...editedForm.value });
	notify('message', 'Задача успешно изменена!');
	emit('closeModal');
};
</script>

<template>
	<TransitionRoot appear :show="isOpen" as="template">
		<Dialog as="div" class="relative z-10">
			<TransitionChild
				as="template"
				enter="duration-300 ease-out"
				enter-from="opacity-0"
				enter-to="opacity-100"
				leave="duration-200 ease-in"
				leave-from="opacity-100"
				leave-to="opacity-0"
			>
				<div class="fixed inset-0 bg-black/25" />
			</TransitionChild>

			<div class="fixed inset-0 overflow-y-auto">
				<div
					class="flex min-h-full items-center justify-center p-4 text-center"
				>
					<TransitionChild
						as="template"
						enter="duration-300 ease-out"
						enter-from="opacity-0 scale-95"
						enter-to="opacity-100 scale-100"
						leave="duration-200 ease-in"
						leave-from="opacity-100 scale-100"
						leave-to="opacity-0 scale-95"
					>
						<DialogPanel
							class="w-full max-w-xl transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all"
						>
							<div>
								<div
									class="flex justify-between items-center pb-2 mb-4 border-b-2"
								>
									<h1 class="text-xl font-bold">
										{{
											actionType === 'create'
												? $t('createTask')
												: $t('editTask')
										}}
									</h1>

									<IconExit @click="emit('closeModal')" />
								</div>

								<div class="flex justify-between space-x-5 border-b-2 pb-4">
									<div class="space-y-5">
										<AppInput
											size="base"
											type="text"
											:title="$t('tableTitle')"
											placeholder="Первое задание"
											:modelValue="
												actionType === 'create' ? form.title : editedForm.title
											"
											@update:modelValue="
												(value) =>
													actionType === 'create'
														? (form.title = value)
														: (editedForm.title = value)
											"
										/>

										<AppInput
											size="base"
											type="text"
											:title="$t('category')"
											placeholder="Категория задачи"
											:modelValue="
												actionType === 'create'
													? form.category
													: editedForm.category
											"
											@update:modelValue="
												(value) =>
													actionType === 'create'
														? (form.category = value)
														: (editedForm.category = value)
											"
										/>

										<AppInput
											size="base"
											type="text"
											:title="$t('priority')"
											placeholder="Приоритет задачи"
											:modelValue="
												actionType === 'create'
													? form.priority
													: editedForm.priority
											"
											@update:modelValue="
												(value) =>
													actionType === 'create'
														? (form.priority = value)
														: (editedForm.priority = value)
											"
										/>
									</div>

									<div class="space-y-5">
										<AppInput
											size="base"
											type="text"
											:title="$t('status')"
											placeholder="Статус текущей задачи"
											:modelValue="
												actionType === 'create'
													? form.status
													: editedForm.status
											"
											@update:modelValue="
												(value) =>
													actionType === 'create'
														? (form.status = value)
														: (editedForm.status = value)
											"
										/>

										<AppInput
											size="base"
											type="text"
											:title="$t('tag')"
											placeholder="#тэг"
											v-model="form.tag"
											:modelValue="
												actionType === 'create' ? form.tag : editedForm.tag
											"
											@update:modelValue="
												(value) =>
													actionType === 'create'
														? (form.tag = value)
														: (editedForm.tag = value)
											"
										/>
									</div>
								</div>
							</div>

							<button
								@click="
									actionType === 'create'
										? submitCreatedTask()
										: submitEditedTask()
								"
								class="flex justify-center bg-gray-100 hover:bg-gray-200 active:bg-gray-300 duration-200 border rounded-full text-sm font-bold px-4 mt-4 pt-1.5 pb-2 w-full"
							>
								{{ actionType === 'create' ? $t('create') : $t('editModal') }}
							</button>
						</DialogPanel>
					</TransitionChild>
				</div>
			</div>
		</Dialog>
	</TransitionRoot>
</template>
