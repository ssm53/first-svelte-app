<script>
	import SvelteMarkdown from 'svelte-markdown';
	import humanize from 'humanize-plus';
	import getUserId from '../../../utils/auth.js';
	import { goto } from '$app/navigation';

	export let data;

	let currentUser = getUserId();
  let userWhoCreated = data.job.user;
	let jobIDD = data.job.id;

	function clickEdit() {
		goto(`/jobs/${jobIDD}/edit`)
	}

</script>
<div class=" bg-black h-fit">
{#if userWhoCreated === currentUser}
<div class=" flex justify-center ">
	<button class=" bg-black border-2 border-pink-500 text-white h-10 mt-10 px-5 rounded-md hover:shadow-lg hover:shadow-pink-500" on:click={clickEdit}>Edit Job</button>
</div>
{/if}





	

	<div class="flex flex-row w-full text-white">
		<div class="basis-2/3 prose max-w-none w-full py-8 text-white">
			<h2 class="text-xl font-thin text-white">Title</h2>
			<SvelteMarkdown source={data.job.title} />
			<div class="mt-6" />
			<h2 class="text-xl font-thin text-white">Employer</h2>
			<SvelteMarkdown source={data.job.employer} />
			<div class="mt-6" />
			<h2 class="text-xl font-thin text-white">Description</h2>
			<SvelteMarkdown source={data.job.description} />
			<div class="mt-6" />
			<h2 class="text-xl font-thin text-white">Requirements</h2>
			<SvelteMarkdown source={data.job.requirements} />
			<div class="mt-6" />
			<h2 class="text-xl font-thin text-white">How to Apply?</h2>
			<p>{data.job.applicationInstructions}</p>
		</div>
		<div class="basis-1/3 ml-4 py-8">
			<h2 class="text-xl font-thin text-white">Location</h2>
			<SvelteMarkdown source={data.job.location} />
			<div class="mt-6" />
			<h2 class="text-xl font-thin text-white">Salary Range</h2>
			<p>
				USD {humanize.formatNumber(data.job.minAnnualCompensation)} - USD {humanize.formatNumber(
					data.job.maxAnnualCompensation
				)}
			</p>
		</div>
	</div>
</div>
<div class=" bg-black h-screen"></div>



