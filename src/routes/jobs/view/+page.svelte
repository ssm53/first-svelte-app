<!-- <script>
  import { jobIDStore } from "../../../store/store";
  import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
  import { goto } from '$app/navigation';

  function clickEdit() {
    goto('/jobs/edit');
  }

  let jobDetails = {};
  let a;
  let b;
  let c;
  let d;
  let e;
  let f;
  let g;
  let h;
  let i;

  export async function getJobDetailbyID() {
    const jobID = $jobIDStore; // Retrieve the job ID from the store
    console.log(jobID);
    if (jobID) {
      const resp = await fetch(
        PUBLIC_BACKEND_BASE_URL + `/api/collections/jobs/records/${jobID}`
      );
      if (resp.status === 200) {
        jobDetails = await resp.json();
        a = jobDetails.title;
        b = jobDetails.id;
        c = jobDetails.minAnnualCompensation;
        d = jobDetails.minAnnualCompensation;
        e = jobDetails.employer;
        f = jobDetails.location;
        g = jobDetails.description;
        h = jobDetails.requirements;
        i = jobDetails.applicationInstructions;
        console.log(typeof jobDetails)
      } else {
        console.log('Error fetching job details');
      }
    }
  

  }


</script>

<button on:click={clickEdit}>Edit job</button>

<h1>{a}</h1>
<h2>{b}</h2>
<h2>{c}</h2>
<h2>{d}</h2>
<h2>{e}</h2>
<h2>{f}</h2>
<h2>{g}</h2>
<h2>{h}</h2>
<h2>{i}</h2>

<button on:click={getJobDetailbyID}>Show my job la, faster faster yerrrr</button> -->






