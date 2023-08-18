import { loggedIn } from '../../../store/store';
import { redirect } from '@sveltejs/kit';

if (loggedIn === false) {
	throw redirect(307, '/');
}
