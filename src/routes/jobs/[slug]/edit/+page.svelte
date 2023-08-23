<script>
  import getUserId from '../../../../utils/auth.js';
  import { goto } from "$app/navigation";
  import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
  export let data;
  import { getTokenFromLocalStorage } from '../../../../utils/auth.js';
  import { loading } from '../../../../store/store.js';
  import Spinner from '../../../../spinner/spinner.svelte';

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
    loading.update((value) => {
      return true
    })

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
      loading.update((value) => {
        return false
      })
			postUpdateJob();
    console.log('formErrors:', formErrors);

	} else {
    loading.update((value) => {
      return false
    })
    const res = await resp.json();
    formErrors = res.data;
    showAlert = true;

  }
}

  
</script>

<div class=" bg-black h-fit">
  <Spinner />

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

<div class="flex justify-center items-center py-5">
  <form on:submit={updateJob} class=" w-5/6">
    <div class="login-control w-full">
      <label class="label" for="jobTitle">
        <span class="label-text text-lg font-extrabold text-white">Job Title</span>
      </label>
      <input
        type="text"
        name="jobTitle"
        placeholder="software engineer"
        class="input input-bordered w-full hover:shadow hover:shadow-pink-500 bg-black text-white border-4 border-pink-500"
        value={data.job.title}
      />
      {#if 'title' in formErrors}
        <label class="label" for="title">
          <span class="label-text-alt text-red-500">{formErrors['title'].message}</span>
        </label>
      {/if} 
    </div>

    <div class="login-control w-full">
      <label class="label" for="minAnnualCompensation">
        <span class="label-text text-lg font-extrabold text-white">Min Annual Compensation</span>
      </label>
      <input
        type="number"
        name="minAnnualCompensation"
        placeholder="40000"
        class="input input-bordered w-full border-4 border-pink-500 hover:shadow hover:shadow-pink-500 bg-black text-white"
        value={data.job.minAnnualCompensation}
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
        <span class="label-text text-lg font-extrabold text-white">Max Annual Compensation</span>
      </label>
      <input
        type="number"
        name="maxAnnualCompensation"
        placeholder="250000"
        class="input input-bordered w-full border-4 border-pink-500 text-white bg-black hover:shadow hover:shadow-gray-700"
        value={data.job.maxAnnualCompensation}
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
        <span class="label-text text-lg font-extrabold text-white">Company Name</span>
      </label>
      <input
        type="text"
        name="companyName"
        placeholder="facebook"
        class="input input-bordered border-4 border-pink-500 w-full hover:shadow hover:shadow-pink-500 text-white bg-black"
        value={data.job.employer}
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
        <span class="label-text text-lg font-extrabold text-white">Job location</span>
      </label>
      <input
        type="text"
        name="jobLocation"
        placeholder="singapore"
        class="input input-bordered w-full border-4 border-pink-500 text-white bg-black hover:shadow hover:shadow-pink-500"
        value={data.job.location}
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
        <span class="label-text text-lg font-extrabold text-white">Description</span>
      </label>
      <textarea
      name="description"
      placeholder="Description goes here"
      class="input input-bordered w-full h-56 text-white bg-black border-4 border-pink-500 hover:shadow hover:shadow-pink-500 resize-none overflow-auto"
      bind:value={data.job.description}
      required
      ></textarea>


   
      {#if 'description' in formErrors}
        <label class="label" for="description">
          <span class="label-text-alt text-red-500">{formErrors['description'].message}</span>
        </label>
      {/if}
    </div>

    <div class="login-control w-full">
      <label class="label" for="requirement">
        <span class="label-text text-lg font-extrabold text-white">Requirement</span>
      </label>
      <textarea
      name="requirement"
      placeholder="state your requirements here"
      class="input input-bordered w-full h-56 text-white bg-black border-4 border-pink-500 hover:shadow hover:shadow-pink-500 resize-none overflow-auto"
      bind:value={data.job.requirements}
      required
      ></textarea>



      {#if 'requirements' in formErrors}
        <label class="label" for="requirements">
          <span class="label-text-alt text-red-500">{formErrors['requirements'].message}</span>
        </label>
      {/if}
    </div>

    <div class="login-control w-full">
      <label class="label" for="applicationInstruction">
        <span class="label-text text-lg font-extrabold text-white">Application Instruction</span>
      </label>
      <textarea
      name="applicationInstruction"
      placeholder="let them know what to do"
      class="input input-bordered w-full h-56 text-white bg-black border-4 border-pink-500 hover:shadow hover:shadow-pink-500 resize-none overflow-auto"
      bind:value={data.job.applicationInstructions}
      required
      ></textarea>
    
 
      {#if 'applicationInstructions' in formErrors}
        <label class="label" for="applicationInstructions">
          <span class="label-text-alt text-red-500"
            >{formErrors['applicationInstructions'].message}</span
          >
        </label>
      {/if}
    </div>

    <div class="login-control w-full mt-4">
      <button class="btn btn-md text-white bg-black border-4 border-pink-500 hover:bg-gray-700 hover:text-yellow-100 hover: shadow hover:shadow-gray-700">Edit Job</button>
    </div>
  </form>
</div>


</div>
