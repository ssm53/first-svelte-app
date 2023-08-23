<script>
	import humanize from 'humanize-plus';
	export let data;
	import { writable } from 'svelte/store';
	
	export const filterOn = writable(false);

	export function clickResetFilter() {
		filterOn.set(false)
		jobArr = [];
		skillsChoice = "";
		locationChoice = "";
		let allChoices = document.querySelectorAll(".optA, .optB, .optC, .opt1, .opt2, .opt3");
		allChoices.classList.remove("bg-red-300");
		allChoices.classList.add("bg-gray-500");
	}

	export function clickFilter() {
		let hiddenModal = document.querySelector(".hidden")
		hiddenModal.classList.remove("hidden");
	}

	let skillsChoice;
	let locationChoice;

	export function clickSkillsChoice(event) {
		console.log(data)
		let a = document.querySelector(".optA");
		let b = document.querySelector(".optB");
		let c = document.querySelector(".optC");
		
		a.classList.remove("bg-red-300"); // Remove red background from all buttons
		b.classList.remove("bg-red-300");
		c.classList.remove("bg-red-300");
		
		a.classList.add("bg-gray-500"); // Set gray background for all buttons
		b.classList.add("bg-gray-500");
		c.classList.add("bg-gray-500");
		
		event.target.classList.remove("bg-gray-500"); // Remove gray background from clicked button
		event.target.classList.add("bg-red-300"); // Set red background for clicked button
		skillsChoice = event.target.textContent;
	}
	export function clickLocationChoice(event) {
		console.log(data)
		let a1 = document.querySelector(".opt1");
		let a2 = document.querySelector(".opt2");
		let a3 = document.querySelector(".opt3");
		
		a1.classList.remove("bg-red-300"); // Remove red background from all buttons
		a2.classList.remove("bg-red-300");
		a3.classList.remove("bg-red-300");
		
		a1.classList.add("bg-gray-500"); // Set gray background for all buttons
		a2.classList.add("bg-gray-500");
		a3.classList.add("bg-gray-500");
		
		event.target.classList.remove("bg-gray-500"); // Remove gray background from clicked button
		event.target.classList.add("bg-red-300"); // Set red background for clicked button
		locationChoice = event.target.textContent;
	}

	let jobArr = [];
	// string.includes(substring, index);

	export function clickSeeJobs() {
		let filterBox = document.querySelector(".filter-box");
		filterBox.classList.add("hidden")
		let arr = data.jobs;

		if(!locationChoice && !skillsChoice) {
			jobArr = data.jobs;
		} else {
			if(!locationChoice) {
				arr.forEach(element => {
					if((element.requirements.toLowerCase()).includes(skillsChoice.toLowerCase())) {
						jobArr.push(element);
					}
				})
			} else {
				if(!skillsChoice) {
					arr.forEach(element => {
						if((element.location.toLowerCase()).includes(locationChoice.toLowerCase())) {
							jobArr.push(element);
						}
					})
				} else {
					arr.forEach(element => {
						if((element.location.toLowerCase()).includes(locationChoice.toLowerCase()) && (element.requirements.toLowerCase()).includes(skillsChoice.toLowerCase())) {
							jobArr.push(element);
						}
					})
				}
			}
		}
		filterOn.set(true);


    console.log(jobArr);

	}

	
		
	
		

	

</script>

<h1 class="text-center text-xl font-bold bg-black pt-10 text-white mb ">Find Your Next Job</h1>
<div class=" bg-black flex justify-center items-center">
	<button class=" bg-black text-white border-4 border-pink-500 rounded-md" on:click={clickFilter}>Filter Jobs</button>
</div> 
<div class=" bg-black flex justify-center items-center">
	<button class=" bg-black text-white border-4 border-pink-500 rounded-md" on:click={clickResetFilter}>Reset Filter</button>
</div> 


<!-- MODAL -->
<div class="w-screen flex-col hidden filter-box">
	<div class="flex flex-col">
		<span>Match your skills</span>
		<div class="flex flex-row">
			<button class=" bg-gray-500 border-2 optA" on:click={clickSkillsChoice}>Javascript</button>
			<button class=" bg-gray-500 border-2 optB" on:click={clickSkillsChoice}>Solidity</button>
			<button class=" bg-gray-500 border-2 optC" on:click={clickSkillsChoice}>Rust</button>

		</div>
	</div>
	<div class="flex flex-col">
		<span>Location</span>
		<div class="flex flex-row">
			<button class=" bg-gray-500 border-2 opt1" on:click={clickLocationChoice}>remote</button>
			<button class=" bg-gray-500 border-2 opt2" on:click={clickLocationChoice}>malaysia</button>
			<button class=" bg-gray-500 border-2 opt3" on:click={clickLocationChoice}>uganda</button>

		</div>
	</div>
	<button on:click={clickSeeJobs}>See Jobs</button>
</div>


<div class="overflow-x-auto w-full bg-black">
	{#if $filterOn === false }
	{#each data.jobs as job}
		<a class="flex flex-row mt-10 ml-4 mr-4 border-4 border-pink-500 text-white rounded-lg py-10 hover:bg-pink-500 hover:shadow-xl hover:shadow-pink-500 hover:text-black" href="/jobs/{job.id}">
			<div class="flex flex-col mt-4 w-4/6 pl-3">
				<div class="font-bold text-2xl">{job.title}</div>
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
		</a>
	{/each}
	{:else}
	{#each jobArr as fJob}
	<a class="flex flex-row mt-10 ml-4 mr-4 border-4 border-pink-500 text-white rounded-lg py-10 hover:bg-pink-500 hover:shadow-xl hover:shadow-pink-500 hover:text-black" href="/jobs/{fJob.id}">
		<div class="flex flex-col mt-4 w-4/6 pl-3">
			<div class="font-bold text-2xl">{fJob.title}</div>
			<span>{fJob.employer} | {fJob.location}</span>
			<p class="w-4/6 mt-5">{fJob.description.slice(0, 240)}...</p>
		</div>
		<div class=" w-2/6 mt-4">
			<div class="text-sm mt-1 ">
				<span class="text-sm"
					>USD {humanize.formatNumber(fJob.minAnnualCompensation)} - USD {humanize.formatNumber(
						fJob.maxAnnualCompensation
					)}</span
				>
			</div>
			<div class="italic text-xs opacity-50 mt-2">
				posted {new Date(fJob.created).toLocaleDateString(undefined, {
					weekday: 'long',
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				})}
			</div>
		</div>
	</a>


	{/each}

	{/if}
</div>
