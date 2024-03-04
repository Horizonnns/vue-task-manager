<script setup>
import { ref, computed } from 'vue';
import { notify } from '@/composables/notify';
import { useTaskStore } from '@/store/store';
import AppModal from '@/components/ui/AppModal.vue';
import IconEdit from '@/components/icons/IconEdit.vue';
import IconDelete from '@/components/icons/IconDelete.vue';

const taskStore = useTaskStore();
const tasks = computed(() => taskStore.tasks);

const isOpen = ref(false);
const actionType = ref('');

// open task modal
const openModal = (type) => {
	isOpen.value = true;
	actionType.value = type;
};

// close task modal
const closeModal = () => {
	isOpen.value = false;
};

// delete-task-with-id
const deleteTask = (task) => {
	taskStore.removeTask(task.id);
	notify('message', 'taskDeletedSuccess');
};

// edit-task-with-id
const getTaskWithID = ref(null);
const edTask = (taskId) => {
	getTaskWithID.value = taskId;
	actionType.value = 'edit';
	openModal();
};

// formating time
const formatTime = (timestamp) => {
	const options = {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
	};

	return new Date(timestamp).toLocaleString('ru', options);
};
</script>

<template>
	<section
		:class="{ 'bg-darkmode-10': taskStore.darkMode }"
		class="h-screen duration-500 py-10"
	>
		<!-- task-modal -->
		<AppModal
			v-if="isOpen"
			:isOpen="isOpen"
			:actionType="actionType"
			:getTaskWithID="getTaskWithID"
			@closeModal="closeModal"
		/>

		<main
			:class="{
				'bg-darkmode-20 text-white !border-gray-800': taskStore.darkMode,
			}"
			class="duration-500 container border shadow-sm rounded-lg space-y-6 p-6"
		>
			<div
				v-if="tasks.length"
				class="flex items-center justify-between border-b border-gray-700 pb-2"
			>
				<h2 class="text-xl">Таблица задач</h2>

				<button
					@click="openModal('create')"
					:class="{ 'bg-darkmode-10': taskStore.darkMode }"
					class="px-3 py-1.5 rounded-md bg-blue-20 hover:bg-blue-600 active:bg-blue-700 duration-150 text-white"
				>
					{{ $t('createTask') }}
				</button>
			</div>

			<!-- flowbite-table -->
			<div v-if="tasks.length" class="relative overflow-x-auto">
				<table class="w-full text-sm text-left rtl:text-right">
					<thead
						:class="{
							'dark:bg-darkmode-10 text-gray-500': taskStore.darkMode,
						}"
						class="text-xs uppercase duration-700 bg-gray-50"
					>
						<tr>
							<th scope="col" class="px-6 py-3">ID</th>
							<th scope="col" class="px-6 py-3">{{ $t('tableTitle') }}</th>
							<th scope="col" class="px-6 py-3">{{ $t('category') }}</th>
							<th scope="col" class="px-6 py-3">{{ $t('priority') }}</th>
							<th scope="col" class="px-6 py-3">{{ $t('status') }}</th>
							<th scope="col" class="px-6 py-3">{{ $t('createdAt') }}</th>
							<th scope="col" class="px-6 py-3">{{ $t('updatedAt') }}</th>
							<th scope="col" class="px-6 py-3">{{ $t('tag') }}</th>
							<th scope="col" class="px-6 py-3">{{ $t('edit') }}</th>
						</tr>
					</thead>

					<tbody v-for="task in tasks" :key="task.id">
						<tr
							:class="{
								'dark:bg-darkmode-20': taskStore.darkMode,
							}"
							class="border-b duration-500"
						>
							<td class="px-6 py-4">{{ task.id }}</td>
							<td class="px-6 py-4">{{ task.title }}</td>
							<td class="px-6 py-4">{{ task.category }}</td>
							<td class="px-6 py-4">{{ task.priority }}</td>
							<td class="px-6 py-4">{{ task.status }}</td>
							<td class="px-6 py-4">{{ formatTime(task.created_at) }}</td>
							<td class="px-6 py-4">Обновлено</td>
							<td class="px-6 py-4">{{ task.tag }}</td>

							<td scope="col" class="space-x-3">
								<button
									@click.stop="edTask(task.id)"
									title="Изменить задачу"
									class="bg-white hover:!bg-gray-100 active:!bg-gray-200 border rounded-lg p-2"
								>
									<IconEdit />
								</button>

								<button
									@click.stop="deleteTask(task)"
									title="Удалить задачу"
									class="bg-white hover:!bg-gray-100 active:!bg-gray-200 text-red-500 border rounded-lg p-2"
								>
									<IconDelete />
								</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div v-else class="flex items-center justify-between">
				<p class="text-center text-lg">
					{{ $t('tasklist') }}
				</p>

				<button
					@click="openModal('create')"
					:class="{ 'bg-darkmode-10': taskStore.darkMode }"
					class="px-3 py-1.5 rounded-md bg-blue-20 hover:bg-blue-600 active:bg-blue-700 duration-150 text-white"
				>
					{{ $t('createTask') }}
				</button>
			</div>
		</main>
	</section>
</template>
