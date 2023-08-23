<script>
	import humanize from 'humanize-plus';
	export let data;
</script>

<h1 class="text-center text-xl font-bold bg-black pt-10 text-white ">Find Your Next Job</h1>
<div class="overflow-x-auto w-full bg-black">
	{#each data.jobs as job}
		<div class="flex flex-row mt-10 ml-4 mr-4 border-4 border-pink-500 text-white rounded-lg py-10 hover:bg-pink-500 hover:shadow-xl hover:shadow-pink-500 hover:text-black">
			<div class="flex flex-col mt-4 w-4/6 pl-3">
				<a class="font-bold text-2xl" href="/jobs/{job.id}">{job.title}</a>
				<span>{job.employer} | {job.location}</span>
				<p class="w-4/6 mt-5">{job.description.slice(0, 240)}...</p>
			</div>
			<div class=" w-2/6 mt-4">
				<div class="text-sm mt-1 ">
					<span class="text-sm"
						>USD {humanize.formatNumber(job.minAnnualCompensation)} - USD {humanize.formatNumber(
							job.maxAnnualCompensation
						)}</span
					>
				</div>
				<div class="italic text-xs opacity-50 mt-2">
					posted {new Date(job.created).toLocaleDateString(undefined, {
						weekday: 'long',
						year: 'numeric',
						month: 'long',
						day: 'numeric'
					})}
				</div>
			</div>
		</div>
	{/each}
</div>
