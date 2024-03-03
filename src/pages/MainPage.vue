<template>
	<main class="bg-white border shadow-xl rounded-lg space-y-6 p-8 my-10">
		<h2 class="text-center text-2xl font-bold leading-6">
			{{ $t('mainTitle') }}
		</h2>

		<div class="max-w-full prose space-y-12">
			<p>
				{{ $t('firstMainParagraph') }}
			</p>

			<div class="pl-6">
				<p>
					<span class="font-bold">{{ $t('firstAdvantages.simplicity') }}</span>
					{{ $t('firstAdvantages.simplicityChild') }}
				</p>

				<p>
					<span class="font-bold">{{
						$t('secondAdvantages.flexibility')
					}}</span>
					{{ $t('secondAdvantages.flexibilityChild') }}
				</p>

				<p>
					<span class="font-bold">{{
						$t('thirdAdvantages.availability')
					}}</span>
					{{ $t('thirdAdvantages.availabilityChild') }}
				</p>
			</div>

			<p>
				{{ $t('secondMainParagraph') }}
			</p>
		</div>
	</main>
</template>
