<template>
	<main class="bg-white space-y-20">
		<section class="container">
			<h2 class="text-center text-3xl font-bold leading-6 mt-12 mb-6">
				{{ $t('mainTitle') }}
			</h2>

			<div class="max-w-full prose space-y-12">
				<p>
					{{ $t('firstMainParagraph') }}
				</p>

				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					<div class="bg-white shadow-sm rounded-md border px-6">
						<img
							src="https://via.placeholder.com/150x150"
							alt="Icon of a list"
						/>
						<h4 class="text-xl font-bold mb-2">
							{{ $t('firstAdvantages.simplicity') }}
						</h4>
						<p class="text-gray-600">
							{{ $t('firstAdvantages.simplicityChild') }}
						</p>
					</div>

					<div class="bg-white shadow-sm rounded-md border px-6">
						<img
							src="https://via.placeholder.com/150x150"
							alt="Icon of a clock"
						/>
						<h4 class="text-xl font-bold mb-2">
							{{ $t('secondAdvantages.flexibility') }}
						</h4>
						<p class="text-gray-600">
							{{ $t('secondAdvantages.flexibilityChild') }}
						</p>
					</div>

					<div class="bg-white shadow-sm rounded-md border px-6">
						<img
							src="https://via.placeholder.com/150x150"
							alt="Icon of a calendar"
						/>
						<h4 class="text-xl font-bold mb-2">
							{{ $t('thirdAdvantages.availability') }}
						</h4>
						<p class="text-gray-600">
							{{ $t('thirdAdvantages.availabilityChild') }}
						</p>
					</div>
				</div>

				<p>
					{{ $t('secondMainParagraph') }}
				</p>
			</div>
		</section>

		<section class="bg-blue-500 text-center py-20">
			<h3 class="text-3xl font-bold text-white mb-8">
				{{ $t('startManaging') }}
			</h3>

			<router-link
				to="/tasks"
				class="bg-white hover:!bg-blue-100 active:!bg-blue-600 active:text-white text-blue-500 py-3 px-6 rounded-md"
			>
				{{ $t('goManaging') }}
			</router-link>
		</section>
	</main>
</template>
