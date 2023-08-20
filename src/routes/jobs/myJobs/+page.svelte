<script>
  export let data;
  import { goto } from '$app/navigation';

</script>
<div class="flex flex-row flex-wrap w-screen h-screen justify-around py-5 bg-yellow-100">
  {#each data.jobs as job}
  <div class=" flex flex-col justify-center items-center h-1/5 w-1/3 bg-yellow-700 text-black mx-px rounded-xl hover:shadow-lg hover:shadow-yellow-700">
    <p class=" mb-3 text-2xl">{job.title}</p>
    <p class=" mb-3 text-2xl"> Created: {job.created.slice(0,10)}</p>
    <div>
      <button class="btn btn-md bg-yellow-400" on:click={() => {
        goto(`/jobs/${job.id}`)
      }}>View Job</button>
      <button class="btn btn-md bg-yellow-400" on:click={() => {
        goto(`/jobs/${job.id}/edit`)
      }}>Edit Job</button>
    </div>

  </div>
  {/each}

</div>