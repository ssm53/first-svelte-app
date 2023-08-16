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
	<button class="go home" on:click={clickHome}>Home</button>
	{#if logIO === true}
		<button class="logout-button" on:click={logOut}>log out</button>
	{:else}
		<button class="login-button" on:click={clickLogin}>log in</button>
	{/if}

	<button class="post-a-job button" on:click={clickPostJob}>post a job</button>
</main>
