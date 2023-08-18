<script>
	import SvelteMarkdown from 'svelte-markdown';
	import humanize from 'humanize-plus';
	import getUserId from '../../../utils/auth.js';
	import { goto } from '$app/navigation';
	import ShaunAuth from '../../../utils/shaun-auth.svelte';

	export let data;

	let currentUser = getUserId();
  let userWhoCreated = data.job.user;
	let jobIDD = data.job.id;

	function clickEdit() {
		goto(`/jobs/${jobIDD}/edit`)
	}

</script>
<div class="bg-yellow-100 h-screen">
	<ShaunAuth />
{#if userWhoCreated === currentUser}
<div class=" flex justify-center ">
	<button class=" bg-yellow-700 h-10 mt-10 px-5 rounded-md hover:shadow-lg hover:shadow-yellow-700" on:click={clickEdit}>Edit Job</button>
</div>
{/if}




<div class="mt-10">
	

	<div class="flex flex-row w-full mt-8">
		<div class="basis-2/3 prose max-w-none w-full">
			<h2 class="text-xl font-thin">Title</h2>
			<SvelteMarkdown source={data.job.title} />
			<div class="mt-6" />
			<h2 class="text-xl font-thin">Employer</h2>
			<SvelteMarkdown source={data.job.employer} />
			<div class="mt-6" />
			<h2 class="text-xl font-thin">Description</h2>
			<SvelteMarkdown source={data.job.description} />
			<div class="mt-6" />
			<h2 class="text-xl font-thin">Requirements</h2>
			<SvelteMarkdown source={data.job.requirements} />
			<div class="mt-6" />
			<h2 class="text-xl font-thin">How to Apply?</h2>
			<p>{data.job.applicationInstructions}</p>
		</div>
		<div class="basis-1/3 ml-4">
			<h2 class="text-xl font-thin">Location</h2>
			<SvelteMarkdown source={data.job.location} />
			<div class="mt-6" />
			<h2 class="text-xl font-thin">Salary Range</h2>
			<p>
				USD {humanize.formatNumber(data.job.minAnnualCompensation)} - USD {humanize.formatNumber(
					data.job.maxAnnualCompensation
				)}
			</p>
		</div>
	</div>
</div>

</div>

