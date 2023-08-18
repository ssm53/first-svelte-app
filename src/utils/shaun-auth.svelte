<script>
	import { loggedIn } from '../store/store';
	import { logOut } from './auth';
	import { goto } from '$app/navigation';

	let logIO;
	loggedIn.subscribe((value) => {
		logIO = value;
	});

	async function clickLogin() {
		goto('/login');
	}

	function clickPostJob() {
		if (logIO === false) {
			goto('users/new');
		} else {
			goto('jobs/new');
		}
	}

	function clickHome() {
		goto('/');
	}
</script>

<main>
	<div class="bg-yellow-100 flex flex-row h-14 justify-between items-center text-white" >
		<div>
			<button class=" ml-5 bg-orange-800 p-3 rounded-full" on:click={clickHome}>Home</button>
		</div>
		{#if logIO === true}
		<div>
			<button class=" bg-orange-800 p-3 rounded-full" on:click={logOut}>log out</button>
		</div>
	{:else}
	<div>
		<button class=" bg-orange-800 p-3 rounded-full" on:click={clickLogin}>log in</button>
	</div>
	{/if}
	<div>
		<button class=" mr-5 bg-orange-800 p-3 rounded-full" on:click={clickPostJob}>post a job</button>
	</div>
	
	</div>

</main>
