import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
import { redirect } from '@sveltejs/kit';
import getUserID from '../../../../utils/auth.js';

export async function load({ fetch, params }) {
	const resp = await fetch(
		PUBLIC_BACKEND_BASE_URL + `/api/collections/jobs/records/${params.slug}`
	);
	const res = await resp.json();
	const userID = getUserID();

	if (res.user !== userID) {
		throw redirect(307, `/jobs/${res.id}`);
	}

	if (resp.status == 200) {
		return {
			job: res
		};
	} else {
		return {
			jobs: []
		};
	}
}
