<script setup>
import { ref, onMounted, computed } from 'vue';
import { notify } from '../composables/notify';
import { useTaskStore } from '../store/store';
import AppInput from '../components/ui/AppInput.vue';
import IconExit from '../components/icons/IconExit.vue';
import IconDelete from '../components/icons/IconDelete.vue';
import {
	TransitionRoot,
	TransitionChild,
	Dialog,
	DialogPanel,
} from '@headlessui/vue';

const taskStore = useTaskStore();
onMounted(() => {
	taskStore.loadTasksFromLocalStorage();
});

const tasks = computed(() => taskStore.tasks);

const form = ref({
	id: 1,
	title: '',
	// descr: '',
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

// create-new-task
const submitTask = () => {
	taskStore.addTask(form.value);
	notify('message', 'Задача успешно создано!');
	closeModal();
	resetModalForm();
};

// delete-task-with-id
const deleteTask = (task) => {
	taskStore.removeTask(task.id);
	notify('message', 'Задача успешно удалена!');
};

const isOpen = ref(false);
function closeModal() {
	isOpen.value = false;
}
function openModal() {
	isOpen.value = true;
}
</script>

<template>
	<main class="bg-white border shadow-xl rounded-lg space-y-6 p-6 my-10">
		<button
			v-if="tasks.length"
			@click="openModal"
			class="px-3 py-1.5 rounded-md bg-blue-20 hover:bg-blue-600 active:bg-blue-700 duration-150 text-white text-sm border shadow"
		>
			Создать таск
		</button>

		<!-- table -->
		<table v-if="tasks.length" class="table table-striped table-hover">
			<thead>
				<tr>
					<th scope="col">ID</th>
					<th scope="col">Заголовок</th>
					<th scope="col">Категория</th>
					<th scope="col">Приоритет</th>
					<th scope="col">Статус</th>
					<th scope="col">Описание</th>
					<th scope="col">Создано</th>
					<th scope="col">Обновлено</th>
					<th scope="col">Редактирование</th>
					<th scope="col">Тэг</th>
				</tr>
			</thead>

			<tbody>
				<tr v-for="task in tasks" :key="task.id" class="cursor-pointer">
					<th scope="col">{{ task.id }}</th>
					<th scope="col">{{ task.title }}</th>
					<th scope="col">{{ task.category }}</th>
					<th scope="col">{{ task.priority }}</th>
					<th scope="col">{{ task.status }}</th>
					<th scope="col">Описание</th>
					<th scope="col">{{ task.created_at }}</th>
					<th scope="col">Обновлено</th>
					<th scope="col">
						<button
							@click="deleteTask(task)"
							title="Удалить задачу"
							class="rounded-lg text-red-500 p-2 bg-white hover:bg-gray-100 border"
						>
							<IconDelete />
						</button>
					</th>
					<th scope="col">{{ task.tag }}</th>
				</tr>
			</tbody>
		</table>

		<div v-else class="flex items-center justify-between">
			<p class="text-center text-lg">Список задач пуст...</p>

			<button
				@click="openModal"
				class="px-3 py-1.5 rounded-md bg-blue-20 hover:bg-blue-600 active:bg-blue-700 duration-150 text-white text-sm border shadow"
			>
				Создать таск
			</button>
		</div>

		<!-- create-tasks-modal -->
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
										<h2 class="text-xl font-bold">Новая задача</h2>

										<IconExit @click="closeModal" />
									</div>

									<div class="flex justify-between space-x-5 border-b-2 pb-4">
										<!-- left-side -->
										<div class="space-y-5">
											<AppInput
												size="base"
												type="text"
												title="Заголовок"
												placeholder="Первое задание"
												v-model="form.title"
											/>

											<AppInput
												size="base"
												type="text"
												title="Категория"
												placeholder="Категория задачи"
												v-model="form.category"
											/>

											<AppInput
												size="base"
												type="text"
												title="Приоритет"
												placeholder="Приоритет задачи"
												v-model="form.priority"
											/>
										</div>

										<!-- right-side -->
										<div class="space-y-5">
											<AppInput
												size="base"
												type="text"
												title="Статус"
												placeholder="Статус текущей задачи"
												v-model="form.status"
											/>

											<AppInput
												size="base"
												type="text"
												title="Тэг"
												placeholder="#тэг"
												v-model="form.tag"
											/>
										</div>
									</div>
								</div>

								<button
									@click="submitTask"
									class="flex justify-center bg-gray-100 hover:bg-gray-200 active:bg-gray-300 duration-200 border rounded-full text-sm font-bold px-4 mt-4 pt-1.5 pb-2 w-full"
								>
									Создать
								</button>
							</DialogPanel>
						</TransitionChild>
					</div>
				</div>
			</Dialog>
		</TransitionRoot>
	</main>
</template>
