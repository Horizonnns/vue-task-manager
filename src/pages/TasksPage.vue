<script setup>
import { ref } from 'vue';
import { TransitionRoot, TransitionChild, Dialog } from '@headlessui/vue';
import { useTaskStore } from '../store/store';
const taskStore = useTaskStore();

const tasks = ref(false);
const isOpen = ref(false);

function closeModal() {
	isOpen.value = false;
}
function openModal() {
	isOpen.value = true;
}

const form = ref({
	id: 0,
	title: '',
	// descr: '',
	category: '',
	priority: '',
	status: '',
	outdate: '',
	tag: '',
});

const submitTask = () => {
	form.value.id++;
	taskStore.addTask(form.value);
	closeModal();
};
</script>

<template>
	<main class="bg-white border shadow-xl rounded-lg space-y-6 p-6 my-10">
		<p>{{ taskStore }}</p>

		<!-- table -->
		<table v-if="tasks" class="table">
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
					<th scope="col">Дата окончания</th>
					<th scope="col">Тэг</th>
				</tr>
			</thead>

			<tbody id="tableBody"></tbody>
		</table>

		<div v-else class="flex items-center justify-between">
			<p class="text-center text-lg">Список задач пуст...</p>

			<button @click="openModal">Создать таск</button>
		</div>

		<!-- create-task-modal -->
		<TransitionRoot appear :show="isOpen" as="template">
			<Dialog as="div" @close="closeModal" class="relative z-10">
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
								class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
							>
								<form class="flex space-x-10">
									<!-- left side -->
									<div>
										<div class="flex flex-col">
											<label for="title">Заголовок</label>
											<input
												v-model="form.title"
												id="title"
												type="text"
												class="border"
											/>
										</div>

										<div class="flex flex-col">
											<label for="category">Категория</label>
											<input
												v-model="form.category"
												id="category"
												type="text"
												class="border"
											/>
										</div>

										<div class="flex flex-col">
											<label for="priority">Приоритет</label>
											<input
												v-model="form.priority"
												id="priority"
												type="text"
												class="border"
											/>
										</div>
									</div>

									<!-- right side -->
									<div>
										<div class="flex flex-col">
											<label for="status">Статус</label>
											<input
												v-model="form.status"
												id="status"
												type="text"
												class="border"
											/>
										</div>

										<div class="flex flex-col">
											<label for="outdate">Дата окончания</label>
											<input
												v-model="form.outdate"
												id="outdate"
												type="text"
												class="border"
											/>
										</div>

										<div class="flex flex-col">
											<label for="tag">Тэг</label>
											<input
												v-model="form.tag"
												id="tag"
												type="text"
												class="border"
											/>
										</div>
									</div>
								</form>

								<button
									@click="submitTask"
									type="submit"
									class="btn btn-success bg-green-600"
								>
									Добавить
								</button>
							</DialogPanel>
						</TransitionChild>
					</div>
				</div>
			</Dialog>
		</TransitionRoot>
	</main>
</template>
