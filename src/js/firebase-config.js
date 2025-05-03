// Import Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js';

const firebaseConfig = {
	apiKey: 'AIzaSyA7Vj4w5-K6dHwAVGjumaXzXdLnu3NYY8w',
	authDomain: 'booking-system-5c8dc.firebaseapp.com',
	projectId: 'booking-system-5c8dc',
	storageBucket: 'booking-system-5c8dc.appspot.com',
	messagingSenderId: '343758379907',
	appId: '1:343758379907:web:4fc3140079366b56c234b6',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Export for use in other files
export { auth, db };
