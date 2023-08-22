<script>
	import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
	import { goto } from '$app/navigation';
	import { authenticateUser } from './../../../utils/auth.js';
	import { loggedIn } from '../../../store/store.js';
	let formErrors = {};


	function goBackHome() {
		goto("/");
	}

	function postSignUp() {
		loggedIn.update((value) => {
			return true;
		});
		goto('/jobs/new');
	}

	// async function test() {
	// 	const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/api/collections/users/records');
	// 	const res = await resp.json();
	// 	console.log(res);
	// }

	async function createUser(evt) {
		evt.preventDefault();

		if (evt.target['password'].value != evt.target['password-confirmation'].value) {
			formErrors['password'] = { message: 'Password confirmation does not match' };
			return;
		}

		const userData = {
			username: evt.target['username'].value,
			email: evt.target['email'].value,
			password: evt.target['password'].value,
			passwordConfirm: evt.target['password-confirmation'].value
		};

		const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/api/collections/users/records', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(userData)
		});

		if (resp.status == 200) {
			const res = await authenticateUser(userData.username, userData.password);

			if (res.success) {
				postSignUp();
			} else {
				throw 'Sign up succeeded but authentication failed';
			}
		} else {
			const res = await resp.json();
			formErrors = res.data;
		}
	}
</script>




<div class=" bg-yellow-100 h-screen py-10">
	<h1 class="text-center text-xl">Create an Account to Post a Job</h1>
<div class="text-center">
	<a class="link-hover italic text-xs" href="/login"
		>Already have an account? Click here to login instead.</a
	>
</div>
<div class="flex justify-center items-center mt-8 bg-yellow-100">
	<form on:submit={createUser} class="w-1/3">
		<div class="form-control w-full">
			<label class="label" for="username">
				<span class="label-text">Username</span>
			</label>
			<input
				type="text"
				name="username"
				placeholder="johndoe"
				class="input input-bordered w-full"
			/>
			{#if 'username' in formErrors}
				<label class="label" for="username">
					<span class="label-text-alt text-red-500">{formErrors['username'].message}</span>
				</label>
			{/if}
		</div>

		<div class="form-control w-full">
			<label class="label" for="email">
				<span class="label-text">Email</span>
			</label>
			<input
				type="email"
				name="email"
				placeholder="john@example.com"
				class="input input-bordered w-full"
				required
			/>
			{#if 'email' in formErrors}
				<label class="label" for="email">
					<span class="label-text-alt text-red-500">{formErrors['email'].message}</span>
				</label>
			{/if}
		</div>

		<div class="form-control w-full">
			<label class="label" for="password">
				<span class="label-text">Password</span>
			</label>
			<input
				type="password"
				name="password"
				placeholder=""
				class="input input-bordered w-full"
				required
			/>
			{#if 'password' in formErrors}
				<label class="label" for="password">
					<span class="label-text-alt text-red-500">{formErrors['password'].message}</span>
				</label>
			{/if}
		</div>

		<div class="form-control w-full">
			<label class="label" for="password">
				<span class="label-text">Confirm Password</span>
			</label>
			<input
				type="password"
				name="password-confirmation"
				placeholder=""
				class="input input-bordered w-full"
				required
			/>
			{#if 'password' in formErrors}
				<label class="label" for="password">
					<span class="label-text-alt text-red-500">{formErrors['password'].message}</span>
				</label>
			{/if}
		</div>

		<div class="form-control w-full mt-4">
			<button class="btn btn-md text-gray-700 hover:bg-gray-700 hover:shadow hover:shadow-gray-700 hover:text-yellow-100">Create an Account</button>
		</div>
	</form>
</div>

</div>



