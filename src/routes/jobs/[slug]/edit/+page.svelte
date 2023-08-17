<script>
  import getUserId from '../../../../utils/auth.js';
  import { goto } from "$app/navigation";
  import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
  import ShaunAuth from '../../../../utils/shaun-auth.svelte';
  export let data;
  import { getTokenFromLocalStorage } from '../../../../utils/auth.js';

  let formErrors = {}
  let showAlert = false;

  function closeAlert3() {
    showAlert = false;
  }

  export function postUpdateJob() {
    goto(`/jobs/${data.job.id}`)
  }

  export async function updateJob(evt) {
    evt.preventDefault();

    let myToken = getTokenFromLocalStorage();

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
				'Content-Type': 'application/json',
        'Authorization': myToken
        // need onre more which is authorisation - for that the value will be the token when youre signed in
			},
			body: JSON.stringify(updateJobData)
		});

    // let res = await resp.json();
    // console.log(res);

		if (resp.status === 200) {
			postUpdateJob();
    console.log('formErrors:', formErrors);

	} else {
    const res = await resp.json();
    formErrors = res.data;
    showAlert = true;

  }
}

  
</script>

<ShaunAuth />

{#if showAlert}
  <!-- Show alert if showAlert is true -->
  <div class="fixed inset-0 flex items-center justify-center">
    <div class="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded relative" role="alert">
      <strong class="font-bold text-lg mb-2 block">Wrong details!</strong>
      <span class="text-sm block">Please double check it again.</span>
      <span class="absolute top-0 right-0 p-4">
        <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" on:click={closeAlert3}><title>Close</title><path d="M14.348 5.652a.5.5 0 0 0-.707 0L10 9.293 6.354 5.646a.5.5 0 1 0-.708.708L9.293 10l-3.647 3.646a.5.5 0 0 0 .708.708L10 10.707l3.646 3.646a.5.5 0 0 0 .708-.708L10.707 10l3.647-3.646a.5.5 0 0 0 0-.706z"/></svg>
      </span>
    </div>
  </div>
{/if}

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
			{#if 'title' in formErrors}
				<label class="label" for="title">
					<span class="label-text-alt text-red-500">{formErrors['title'].message}</span>
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
			{#if 'employer' in formErrors}
				<label class="label" for="employer">
					<span class="label-text-alt text-red-500">{formErrors['employer'].message}</span>
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
			{#if 'location' in formErrors}
				<label class="label" for="location">
					<span class="label-text-alt text-red-500">{formErrors['location'].message}</span>
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
			{#if 'requirements' in formErrors}
				<label class="label" for="requirements">
					<span class="label-text-alt text-red-500">{formErrors['requirements'].message}</span>
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
			{#if 'applicationInstructions' in formErrors}
				<label class="label" for="applicationInstructions">
					<span class="label-text-alt text-red-500"
						>{formErrors['applicationInstructions'].message}</span
					>
				</label>
			{/if}
		</div>

		<div class="login-control w-full mt-4">
			<button class="btn btn-md">Update Job</button>
		</div>
	</form>
</div>
