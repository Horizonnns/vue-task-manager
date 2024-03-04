<script setup>
import { ref, onMounted, computed } from 'vue';
import { notify } from '../composables/notify';
import { useTaskStore } from '../store/store';
import AppModal from '../components/ui/AppModal.vue';
import IconEdit from '../components/icons/IconEdit.vue';
import IconDelete from '../components/icons/IconDelete.vue';

const taskStore = useTaskStore();
onMounted(() => {
	taskStore.loadTasksFromLocalStorage();
});

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
	notify('message', 'Задача успешно удалена!');
};

// edit-task-with-id
const getTaskWithID = ref();
const edTask = (task) => {
	getTaskWithID.value = task;
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
	<!-- task-modal -->
	<AppModal
		v-if="isOpen"
		:isOpen="isOpen"
		:actionType="actionType"
		:getTaskWithID="getTaskWithID"
		@closeModal="closeModal"
	/>

	<main
		class="container bg-white border shadow-sm rounded-lg space-y-6 p-6 my-10"
	>
		<button
			v-if="tasks.length"
			@click="openModal('create')"
			class="px-3 py-1.5 rounded-md bg-blue-20 hover:bg-blue-600 active:bg-blue-700 duration-150 text-white"
		>
			{{ $t('createTask') }}
		</button>

		<!-- table -->
		<table v-if="tasks.length" class="table table-hover">
			<thead>
				<tr>
					<th scope="col">ID</th>
					<th scope="col">{{ $t('tableTitle') }}</th>
					<th scope="col">{{ $t('category') }}</th>
					<th scope="col">{{ $t('priority') }}</th>
					<th scope="col">{{ $t('status') }}</th>
					<th scope="col">{{ $t('createdAt') }}</th>
					<th scope="col">{{ $t('updatedAt') }}</th>
					<th scope="col">{{ $t('tag') }}</th>
					<th scope="col">{{ $t('edit') }}</th>
				</tr>
			</thead>

			<tbody>
				<tr v-for="task in tasks" :key="task.id" class="cursor-pointer">
					<th scope="col">{{ task.id }}</th>
					<th scope="col">{{ task.title }}</th>
					<td scope="col">{{ task.category }}</td>
					<td scope="col">{{ task.priority }}</td>
					<td scope="col">{{ task.status }}</td>
					<td scope="col">{{ formatTime(task.created_at) }}</td>
					<td scope="col">Обновлено</td>
					<td scope="col">{{ task.tag }}</td>
					<th scope="col" class="space-x-3">
						<button
							@click.stop="edTask(task)"
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
					</th>
				</tr>
			</tbody>
		</table>

		<div v-else class="flex items-center justify-between">
			<p class="text-center text-lg">
				{{ $t('tasklist') }}
			</p>

			<button
				@click="openModal('create')"
				class="px-3 py-1.5 rounded-md bg-blue-20 hover:bg-blue-600 active:bg-blue-700 duration-150 text-white"
			>
				{{ $t('createTask') }}
			</button>
		</div>
	</main>
</template>
