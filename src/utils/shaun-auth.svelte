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
	<div class="bg-orange-500">
		<div>
			<button class="inline" on:click={clickHome}>Home</button>
		</div>
		{#if logIO === true}
		<div>
			<button class="inline" on:click={logOut}>log out</button>
		</div>
	{:else}
	<div>
		<button class="inline" on:click={clickLogin}>log in</button>
	</div>
	{/if}
	<div>
		<button class="post-a-job button" on:click={clickPostJob}>post a job</button>
	</div>
	
	</div>

</main>
