import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';

export async function load({ fetch }) {
	const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/api/collections/jobs/records');

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

// questions
//LIST JOBS
// part 1
// 1. why is our api that link? like where are we getting our data from? - this is just demo link.. real one is like normal e.g. binance - that will be when we deploy and shit.. for now, we use local host 8080 thiny from docker

// part 2
// 1. in load function, why is fetch as such? when using fetch as our variable, is it a convention to use it as such? - yes
// 2. then in our page.svelte file, why are we exporting data? and i dont understand the use of it as its not getting defined? -
// whenw we get shits from js file, it automatically returns it as data variable..for export, we dk.. leave it for now

// SHOW JOBS
// part 1
// 1. i understand slug, but is it okay if it gets nested in my other file as such.. cause now if i wanna make a file using /slug/page.svelte, i cant.. i have to manually create new file -- thats cause we only had one folder under jonbs. if we create more, all gucci..
// part 2
// 2. just to confirm, params allows us to get specific data about jobs.. eg if we're looking for jobs/software eng/usa.. params allows us to get software eng and usa - YES

// CREATE USER
// 1. when i try to do the insomnia thingy, it doesnt work. sorry, but can I please get a demo? - all good. read CRUD
// 2. dont really undestand this part -need to make secondary request to the login endpoint

// last but not least, when and where do we need to use pocketbase - just a place to host your backend server - our backend will be the localhost shit 8080. insomnia is to test our api's, docker is to allow everything to be used for others

// summary about our backendshit
// pocketbase is like cloudflare where it can faciliatate getting and posting shit to our backend
// get is from backend to frontend... post is from frontend to backend
// our host is the 8080 thingy but later it will be AWS or in our case fly.io
// docket is to allow for other devs to get our shit in a consistent manner
// insomnia is to just check if our api calls are goood.. e.g. we created a new user. now we want to check our database
// to see if the new user is actually created. to do thi, we need to do a get request on insomnia to check if the
// new user is actually in our database.

// further questions
// CREATE USER
// part 1
// 1. where do we write pocketbase code? oohhhh im guessing its connected to my question no2 right?

// 2. for our fetch function here, why do need these method:post etc
// - so here, we are getting data from our backend, and use specific shits at the right of the +..

// 3. for our fetch function, chatgpt mentioned that after we post data to the backend, the backend will send a response back
// stored in the resp variable... why do they need to send a response back? and what do they send?
// so here its cause we want it to auto login when someones signs up.. if no need that, then no response sent back

// 4. what is form errors? to me, it looks like an empty array..
// in our createauser function, i get it that if not same password, we send msg to them. but how do we know what
// formerrors['password'] is? also, does message here have any specific meaning?
// so at the not same password section at the top, we are initialising it... we should actualy also do it for others e.g. got username in database ady... so yeah youre correct, you will need to initiliase it if wanna do properly

// 5. further down the code, i see #if username in formErrors, then we say eh cannot come! but again, how do we know what form
// erros is and what is message? cause we didnt intitilaise any of this. at the top, we initialise empty formErrors.
// answered at the previous q

// INSOMNIA AND POCKETBASE
// insomnia
// to check if an api is working, or to see data from our api, use insomnia..here, click the small + button on the right which is close to the midle.. dont click the most right one. then do get or post... then put in our api link... must be a proper link..then if post input the field we want to send.. it must follow whats in the body of our api call, and normally is in json..we must also input actuall stuff in.. e.g. cannot use variables.. so "title": "software eng".. also remember must use quotes around it

// pocketbase
// gives direction as to how we can get data from our backend... we can then take this info and input it into our insomnia to test it out.. the api is given in pocketbase.. thats the main thing you should be looking for.. other shits are abiiiit secondary

// usename - zezmenez
//password - Bobbybrown7

// steps for shaun to do

// done
// phase 1
// I created a store to track if a user is logged in or not. After authentication, the users will get automatically logged in, and when they press log out button, they get logged out. When they are loggedin, they can see job form. When they are logged out, ask them to create account. create account is fine.

//phase 2
// now, when they are logged out, they now can actually login back.

//phase3
// now when teyre loggedin, and fill up and sumbit create job form, a job actually gets created and they go to the home page

// phase 4
// users can choose their job on the homepage, and depending on whether you created it or not, you can edit it. if you didnt create you cannot access the edit page and thus cant edit it.

// phase 5
// once click edit button, you will be directed to edit page and form is prepopulated. now you can edit it

//phase 6
// now can successfully update jobs

// phase 7
// can do alerts

// phase 8
// did kean meng's thingy!

// style extra done
// added logo
// did trust us banner
// made sure cursor starts top - left
// did neon glowing login button
// neon login button

//STYLE TO-DO
// do this animation intersect scroll - https://www.youtube.com/watch?v=T33NN_pPeNI&ab_channel=BeyondFireship
// do blob - https://www.youtube.com/watch?v=4ALLynsZ0u0&list=PL4-IK0AVhVjMI45H5E9oE47wj-7AZLNnK&index=34&ab_channel=KevinPowell
// do button ripple effect - https://www.youtube.com/watch?v=ueyRcYEmsrI&ab_channel=OnlineTutorials
// do slider
// do navbar like this - https://www.youtube.com/watch?v=EXzotQV4tDM&ab_channel=El_ShadowAcademy
// do darkmode - https://www.youtube.com/watch?v=oMOe_32M6ss&ab_channel=JohnKomarnicki

// FUNCTIONALITY TO-DO
