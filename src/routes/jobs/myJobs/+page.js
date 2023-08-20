import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
import getUserId from '../../../utils/auth';

let userId;

export async function load({ fetch }) {
	userId = getUserId();
	const resp = await fetch(
		PUBLIC_BACKEND_BASE_URL + `/api/collections/jobs/records?filter=(user='${userId}')`
	);

	const res = await resp.json();
	if (resp.status == 200) {
		return {
			jobs: res.items
		};
	} else {
		return {
			jobs: []
		};
	}
}

// http://localhost:8080/api/collections/jobs/records?filter=(user='mpmztqu52bfj7q4')
