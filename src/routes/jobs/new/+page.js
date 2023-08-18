import { loggedIn } from '../../../store/store';
import { redirect } from '@sveltejs/kit';

if (loggedIn !== true) {
	throw redirect(307, '/');
}
