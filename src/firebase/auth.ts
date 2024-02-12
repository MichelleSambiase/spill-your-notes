import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
	apiKey: 'AIzaSyANhYQKx239aspKYkvnEfrnEa6JNSz_OoA',
	authDomain: 'spill-your-notes.firebaseapp.com',
	projectId: 'spill-your-notes',
	storageBucket: 'spill-your-notes.appspot.com',
	messagingSenderId: '35689064600',
	appId: '1:35689064600:web:077bf5a07a3bddc45008ed',
	measurementId: 'G-6FYNY91Y72'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export const auth = getAuth(app)



export default app

