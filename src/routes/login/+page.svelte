<script>
	import { authenticateUser } from '../../utils/auth';
	import { goto } from '$app/navigation';

	let formErrors = {};

	let username = "";
	let password = "";
	let showAlert = false;

	async function closeAlert() {
		showAlert = false;
	}

	async function handleSubmit(event) {
		event.preventDefault();

		username = event.target.username.value;
		password = event.target.password.value;


		const { success } = await authenticateUser(username, password);

		if (success) {
			// Successful login, navigate to the home page
			goto('/');
		} else {
			// formErrors['username'] = { message: 'Wrong username or password' };
			// formErrors['password'] = { message: 'Wrong username or password' };




		// 	if (evt.target['password'].value != evt.target['password-confirmation'].value) {
		// 	formErrors['password'] = { message: 'Password confirmation does not match' };
		// 	return;
		// }

			showAlert = true;
		}
	}
</script>

<div class="bg-yellow-100 h-screen">
	<div class="flex justify-center py-20">
		<img src="https://images.websiteplanet.com/wp-content/uploads/2020/08/9-Best-Z-Logos-and-How-to-Make-Your-Own-for-Free-image1.png" alt="Home" class=" w-32 rounded-lg"/>
	</div>

	<div class="flex justify-center items-center py-8">
		{#if showAlert}
		<!-- Show alert if showAlert is true -->
		<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
			<strong class="font-bold text-sm block sm:inline mb-1">Wrong credentials!</strong>
			<span class="block sm:inline text-sm mb-2 sm:mb-0">Please check your username and password and try again.</span>
			<span class="absolute top-0 bottom-0 right-0 px-4 py-3">
				<svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" on:click={closeAlert}><title>Close</title><path d="M14.348 5.652a.5.5 0 0 0-.707 0L10 9.293 6.354 5.646a.5.5 0 1 0-.708.708L9.293 10l-3.647 3.646a.5.5 0 0 0 .708.708L10 10.707l3.646 3.646a.5.5 0 0 0 .708-.708L10.707 10l3.647-3.646a.5.5 0 0 0 0-.706z"/></svg>
			</span>
		</div>
		{/if}
		
	
		<form on:submit={handleSubmit} class="w-1/3">
			<div class="login-control w-full">
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
		
			<div class="login-control w-full">
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
		
			<div class="login-control w-full mt-4">
				<button class="btn btn-md hover:bg-gray-700 hover:text-yellow-100">Login</button>
			</div>
		</form>
	
	
		
	</div>


</div>


