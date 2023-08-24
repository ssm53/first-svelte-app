<script>
	import { goto } from '$app/navigation';
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
		allChoices.forEach(choice => {
        choice.classList.remove("bg-red-300");
        choice.classList.add("bg-black");
    });
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
		
		a.classList.add("bg-black"); // Set gray background for all buttons
		b.classList.add("bg-black");
		c.classList.add("bg-black");
		
		event.target.classList.remove("bg-black"); // Remove gray background from clicked button
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
		
		a1.classList.add("bg-black"); // Set gray background for all buttons
		a2.classList.add("bg-black");
		a3.classList.add("bg-black");
		
		event.target.classList.remove("bg-black"); // Remove gray background from clicked button
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

	export function clickCloseFilter() {
		filterOn.set(false)
		jobArr = [];
		skillsChoice = "";
		locationChoice = "";
		let allChoices = document.querySelectorAll(".optA, .optB, .optC, .opt1, .opt2, .opt3");
		allChoices.forEach(choice => {
        choice.classList.remove("bg-red-300");
        choice.classList.add("bg-black");
    });
		let filterBox = document.querySelector(".filter-box");
		filterBox.classList.add("hidden")


	}

	
		
	
		

	

</script>

<h1 class="text-center text-2xl font-bold bg-black pt-10 text-white mb ">Find Your Next Job</h1>
<div class="flex flex-row bg-black">
	<div class=" bg-black">
		<button class=" bg-black text-white border-4 border-pink-500 rounded-md p-4 py-px hover:shadow-lg hover:shadow-pink-500" on:click={clickFilter}>Filter Jobs</button>
	</div> 


</div>



<!-- MODAL -->
<div class="w-screen flex-col hidden filter-box bg-black">
	<div class=" flex justify-end">
		<button class=" bg-black text-white border-pink-500 border-2 optA mr-2 p-2 rounded-lg hover:shadow-md hover:shadow-pink-500" on:click={clickCloseFilter}>Close Filters</button>
	</div>
	<div class="flex flex-col justify-center items-center">
		<span class="text-white text-xl font-bold mb-3">Match your skills</span>
		<div class="flex flex-row">
			<button class=" bg-black text-white border-pink-500 border-2 optA mr-2 p-2 rounded-lg hover:shadow-md hover:shadow-pink-500" on:click={clickSkillsChoice}>Javascript</button>
			<button class=" bg-black text-white border-pink-500 border-2 optB mr-2 p-2 rounded-lg hover:shadow-md hover:shadow-pink-500" on:click={clickSkillsChoice}>Solidity</button>
			<button class=" bg-black text-white border-pink-500 border-2 optC mr-2 p-2 rounded-lg hover:shadow-md hover:shadow-pink-500" on:click={clickSkillsChoice}>Rust</button>

		</div>
	</div>
	<div class="flex flex-col justify-center items-center">
		<span class="text-white text-xl font-bold mt-3 mb-3">Location</span>
		<div class="flex flex-row">
			<button class=" bg-black text-white border-pink-500 border-2 opt1 mr-2 p-2 rounded-lg hover:shadow-md hover:shadow-pink-500" on:click={clickLocationChoice}>remote</button>
			<button class="  bg-black text-white border-pink-500 border-2 opt2 mr-2 p-2 rounded-lg hover:shadow-md hover:shadow-pink-500" on:click={clickLocationChoice}>malaysia</button>
			<button class="  bg-black text-white border-pink-500 border-2 opt3 mr-2 p-2 rounded-lg hover:shadow-md hover:shadow-pink-500" on:click={clickLocationChoice}>uganda</button>

		</div>
	</div>
	<div class=" flex justify-center items-center mt-5">
		<div class=" bg-black">
			<button class=" bg-black text-white border-4 border-pink-500 rounded-md ml-5 px-12 px-py mr-3 hover:shadow-lg hover:shadow-pink-500" on:click={clickResetFilter}>Reset Filter</button>
		</div> 
		<button class=" bg-black text-white border-pink-500 border-4 rounded-lg px-8 px-py hover:shadow-md hover:shadow-pink-500 " on:click={clickSeeJobs}>See Filtered Jobs</button>
	</div>

</div>


<div class="overflow-x-auto w-full bg-black">
	{#if $filterOn === false }
	{#each data.jobs as job}
		<a class="flex flex-row mt-10 ml-4 mr-4 border-4 border-pink-500 text-white rounded-lg py-10 hover:bg-pink-500 hover:shadow-xl hover:shadow-pink-500 hover:text-black" href="/jobs/{job.id}" target="_blank">
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
	<button class=" mt-3 px-6 bg-black text-white border-4 border-pink-500 rounded-md p-4 py-px hover:shadow-lg hover:shadow-pink-500" on:click={clickResetFilter}>All Jobs</button>
	{#each jobArr as fJob}
	<a class="flex flex-row mt-10 ml-4 mr-4 border-4 border-pink-500 text-white rounded-lg py-10 hover:bg-pink-500 hover:shadow-xl hover:shadow-pink-500 hover:text-black" href="/jobs/{fJob.id}" target="_blank">
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
	<div class="bg-black w-screen h-screen"></div>


	{/each}

	{/if}
</div>
