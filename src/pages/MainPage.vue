<template>
	<main>
		<!-- table -->
		<table class="table">
			<thead class="thead">
				<tr>
					<th scope="col">
						<span>Название сделки</span>

						<button class="sort-by-name-btn btn btn-outline-light">
							<svg
								class="price-icon"
								data-slot="icon"
								aria-hidden="true"
								fill="none"
								stroke-width="2.5"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								></path>
							</svg>
						</button>
					</th>
					<th scope="col">
						<span>Бюджет</span>

						<button class="sort-by-budget-btn btn btn-outline-light">
							<svg
								class="price-icon"
								data-slot="icon"
								aria-hidden="true"
								fill="none"
								stroke-width="2.5"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								></path>
							</svg>
						</button>
					</th>

					<th scope="col">Дата создания</th>
					<th scope="col">Дата изменения</th>
					<th scope="col">Ответственный</th>
				</tr>
			</thead>

			<div class="tbody-container">
				<tbody id="tableBody" class="tbody-fonts">
					<!-- rows with leads -->
				</tbody>
			</div>
		</table>
	</main>
</template>
