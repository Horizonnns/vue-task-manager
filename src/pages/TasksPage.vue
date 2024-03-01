<template>
	<main class="bg-white border shadow-xl rounded-lg space-y-6 p-8 my-10">
		<!-- table -->
		<table class="table">
			<thead class="thead">
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

			<tbody id="tableBody" class="tbody-fonts"></tbody>
		</table>
	</main>
</template>
