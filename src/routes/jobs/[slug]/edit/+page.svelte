<script>
  import getUserId from '../../../../utils/auth.js';
  import { goto } from "$app/navigation"
  import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
  export let data;
  let formErrors = {}

  export function postUpdateJob() {
    goto(`/jobs/${data.job.id}`)
  }

  export async function updateJob(evt) {
    evt.preventDefault();

		let userID = getUserId();
		// console.log(userID);
		// issue is here, have to format it the correct way so that it can get into
		const updateJobData = {
			applicationInstructions: evt.target['applicationInstruction'].value,
			description: evt.target['description'].value,
			employer: evt.target['companyName'].value,
			location: evt.target['jobLocation'].value,
			maxAnnualCompensation: parseInt(evt.target['maxAnnualCompensation'].value),
			minAnnualCompensation: parseInt(evt.target['minAnnualCompensation'].value),
			requirements: evt.target['requirement'].value,
			title: evt.target['jobTitle'].value,
			user: userID,
		};

		const resp = await fetch(PUBLIC_BACKEND_BASE_URL + `/api/collections/jobs/records/${data.job.id}`, {
			method: 'PATCH',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(updateJobData)
		});

    let res = await resp.json();
    console.log(res);

		if (resp.status === 200) {
			postUpdateJob();
		} else {
			console.log('annoying la');
		}
	
	}

  
</script>




<div class="flex justify-center items-center mt-8">
	<form on:submit={updateJob} class="w-1/3">
		<div class="login-control w-full">
			<label class="label" for="jobTitle">
				<span class="label-text">Job Title</span>
			</label>
			<input
				type="text"
				name="jobTitle"
				placeholder="software engineer"
				class="input input-bordered w-full"
        value = {data.job.title}
			/>
			{#if 'jobTitle' in formErrors}
				<label class="label" for="jobTitle">
					<span class="label-text-alt text-red-500">{formErrors['jobTitle'].message}</span>
				</label>
			{/if}
		</div>

		<div class="login-control w-full">
			<label class="label" for="minAnnualCompensation">
				<span class="label-text">Min Annual Compensation</span>
			</label>
			<input
				type="number"
				name="minAnnualCompensation"
				placeholder="40000"
				class="input input-bordered w-full"
        value = {data.job.minAnnualCompensation}
				required
			/>
			{#if 'minAnnualCompensation' in formErrors}
				<label class="label" for="minAnnualCompensation">
					<span class="label-text-alt text-red-500"
						>{formErrors['minAnnualCompensation'].message}</span
					>
				</label>
			{/if}
		</div>
		<p>USD</p>

		<div class="login-control w-full">
			<label class="label" for="maxAnnualCompensation">
				<span class="label-text">Max Annual Compensation</span>
			</label>
			<input
				type="number"
				name="maxAnnualCompensation"
				placeholder="250000"
				class="input input-bordered w-full"
        value = {data.job.maxAnnualCompensation}
				required
			/>
			{#if 'maxAnnualCompensation' in formErrors}
				<label class="label" for="maxAnnualCompensation">
					<span class="label-text-alt text-red-500"
						>{formErrors['maxAnnualCompensation'].message}</span
					>
				</label>
			{/if}
		</div>
		<p>USD</p>

		<div class="login-control w-full">
			<label class="label" for="companyName">
				<span class="label-text">Company Name</span>
			</label>
			<input
				type="text"
				name="companyName"
				placeholder="facebook"
				class="input input-bordered w-full"
        value = {data.job.employer}
				required
			/>
			{#if 'companyName' in formErrors}
				<label class="label" for="companyName">
					<span class="label-text-alt text-red-500">{formErrors['companyName'].message}</span>
				</label>
			{/if}
		</div>

		<div class="login-control w-full">
			<label class="label" for="jobLocation">
				<span class="label-text">Job location</span>
			</label>
			<input
				type="text"
				name="jobLocation"
				placeholder="singapore"
				class="input input-bordered w-full"
        value = {data.job.location}
				required
			/>
			{#if 'jobLocation' in formErrors}
				<label class="label" for="jobLocation">
					<span class="label-text-alt text-red-500">{formErrors['jobLocation'].message}</span>
				</label>
			{/if}
		</div>

		<div class="login-control w-full">
			<label class="label" for="description">
				<span class="label-text">Description</span>
			</label>
			<input
				type="text"
				name="description"
				placeholder="anything you fuckin want mofo"
				class="input input-bordered w-full"
        value = {data.job.description}
				required
			/>
			{#if 'description' in formErrors}
				<label class="label" for="description">
					<span class="label-text-alt text-red-500">{formErrors['description'].message}</span>
				</label>
			{/if}
		</div>

		<div class="login-control w-full">
			<label class="label" for="requirement">
				<span class="label-text">Requirement</span>
			</label>
			<input
				type="text"
				name="requirement"
				placeholder="i need you to suck dick"
				class="input input-bordered w-full"
        value = {data.job.requirements}
				required
			/>
			{#if 'requirement' in formErrors}
				<label class="label" for="requirement">
					<span class="label-text-alt text-red-500">{formErrors['requirement'].message}</span>
				</label>
			{/if}
		</div>

		<div class="login-control w-full">
			<label class="label" for="applicationInstruction">
				<span class="label-text">Application Instruction</span>
			</label>
			<input
				type="text"
				name="applicationInstruction"
				placeholder="need you to suck dick"
				class="input input-bordered w-full"
        value = {data.job.applicationInstructions}
				required
			/>
			{#if 'applicationInstruction' in formErrors}
				<label class="label" for="applicationInstruction">
					<span class="label-text-alt text-red-500"
						>{formErrors['applicationInstruction'].message}</span
					>
				</label>
			{/if}
		</div>

		<div class="login-control w-full mt-4">
			<button class="btn btn-md">Update Job</button>
		</div>
	</form>
</div>
