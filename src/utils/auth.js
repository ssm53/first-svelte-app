import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
//SHAUNS CODE
import { goto } from '$app/navigation';
import { loggedIn } from '../store/store';
//SHAUNS CODE

// setting empty auth so that logput function can use... emptyauth is when there is no token and userid
const emptyAuth = {
	token: '',
	userId: ''
};
// to logout..this function sets localstorage shits to emptyauth.. which means they're logged out
// so here, we are setting auth to empty auth... how do we know what is auth? we can use insomnia to check details and shit
export function logOut() {
	localStorage.setItem('auth', JSON.stringify(emptyAuth));
	//SHAUNS CODE
	loggedIn.update((value) => {
		return false;
	});
	goto('/users/new');

	//SHAUNS CODE

	return true;
}

// get user id.. if theyre authenticated, we reutrn id. but why no need to fetch data here? also what does this mean? .getiten(auth)? means auth is true la? but i dont see it in the authenticateuser function.

// A: this one is setting auth to our token and userId. remember, auth is our token and userId. if we got our token, and userid,
// return our userId.. remmeber, our const auth is trying to replicate the auth from the backend... which is in our localstorage
export default function getUserId() {
	const auth = localStorage.getItem('auth');
	if (auth) {
		return JSON.parse(auth)['userId'];
	}
	return null;
}

// if theyre authenticated,  return token.. again why no need to fetch data? and theyre returnig the token right?
//A: same as above, but for token!
export function getTokenFromLocalStorage() {
	const auth = localStorage.getItem('auth');
	if (auth) {
		return JSON.parse(auth)['token'];
	}
	return null;
}

// // SHAUN's code - replaces code directly commented below
// export async function isLoggedIn() {
// 	if (!getTokenFromLocalStorage()) {
// 		loggedIn.update((value) => {
// 			return false;
// 		});
// 	} else {
// 		loggedIn.update((value) => {
// 			return true;
// 		});
// 	}
// 	//SHAUNS code

export async function isLoggedIn() {
	if (!getTokenFromLocalStorage()) {
		return false;
	}

	// lastly, why here need to fetch data but others no need?
	// A: cause here, we are trying to compare our data with the backend.. the other functions above, we were just setting up
	// our variables..
	// A; we actually already git our token from the function above... but here, we're cehcking if our token actually exists in our actual backend..if actually the same, response is 200, and we proceed further
	try {
		const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/api/collections/users/auth-refresh', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				Authorization: getTokenFromLocalStorage()
			}
		});

		const res = await resp.json();
		if (resp.status == 200) {
			localStorage.setItem(
				'auth',
				JSON.stringify({
					// but here, were setting our token. what's the diff with this and gettokenfromlocalstoreage?
					// A; we are just double checking if our token is the same w the token in our database.. if it is the same, resp = 200!
					token: res.token,
					userId: res.record.id
				})
			);
			goto('/');

			return true;
		}

		return false;
	} catch {
		return false;
	}
}
// now here, each fetch function has different shits.. its based on pb's documentation la?
// A: is it what is izzzzz
export async function authenticateUser(username, password) {
	const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/api/collections/users/auth-with-password', {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			identity: username,
			password
		})
	});

	const res = await resp.json();

	if (resp.status == 200) {
		localStorage.setItem(
			'auth',
			JSON.stringify({
				token: res.token,
				userId: res.record.id
			})
		);
		//shauns code
		loggedIn.update((value) => {
			return true;
		});
		goto('/');
		//shauns code
		return {
			success: true,
			res: res
		};
	} else {
		console.log('fucking annoying');
		return {
			success: false,
			res: res
		};
	}

	// return {
	// 	success: false,
	// 	res: res
	// };
}
