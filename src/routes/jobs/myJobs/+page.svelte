<script>
  export let data;
  import { goto } from '$app/navigation';

</script>
<div class="flex flex-row flex-wrap w-screen h-screen justify-around py-5 bg-black">
  {#each data.jobs as job}
  <div class=" flex flex-col justify-center items-center h-1/5 w-1/3 border-4 border-pink-500 bg-black text-white mx-px rounded-xl hover:shadow-lg hover:shadow-pink-500">
    <p class=" mb-3 text-2xl">{job.title}</p>
    <p class=" mb-3 text-2xl"> Created: {job.created.slice(0,10)}</p>
    <div>
      <button class="btn btn-md bg-black text-white border-4 border-pink-500" on:click={() => {
        goto(`/jobs/${job.id}`)
      }}>View Job</button>
      <button class="btn btn-md bg-black text-white border-4 border-pink-500" on:click={() => {
        goto(`/jobs/${job.id}/edit`)
      }}>Edit Job</button>
    </div>

  </div>
  {/each}

</div>