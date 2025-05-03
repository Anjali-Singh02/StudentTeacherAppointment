// login.js

// Import Firebase modules
import { auth, db } from './firebase-config.js';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js';
import {
	setDoc,
	doc,
	getDoc,
} from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js';

// Utility logging function
function logEvent(action, details) {
	console.log(`[LOG][${new Date().toISOString()}] ${action}:`, details);
}

// DOM elements
const loginBtn = document.getElementById('login');
const registerBtn = document.getElementById('register');
const logoutBtn = document.getElementById('logout');

// LOGIN
loginBtn.onclick = async () => {
	const email = document.getElementById('email').value.trim();
	const password = document.getElementById('password').value.trim();

	if (!email || !password) {
		alert('Please fill out all fields.');
		return;
	}

	try {
		const userCredential = await signInWithEmailAndPassword(
			auth,
			email,
			password,
		);
		const user = userCredential.user;

		// Get user role from Firestore
		const userDocRef = doc(db, 'users', user.uid);
		const userDoc = await getDoc(userDocRef);

		if (!userDoc.exists()) {
			alert('❌ User role not found in database.');
			return;
		}

		const { role } = userDoc.data();

		// Save session
		localStorage.setItem(
			'user',
			JSON.stringify({ email: user.email, role }),
		);

		// Show dashboard
		document.getElementById('auth-section').classList.add('hidden');
		document.getElementById('dashboard').classList.remove('hidden');
		document.getElementById('userName').innerText =
			user.email.split('@')[0];

		logEvent('Login Success', { email: user.email, role });
	} catch (error) {
		alert(`❌ Login failed: ${error.message}`);
		logEvent('Login Failed', error.message);
	}
};

// REGISTER
registerBtn.onclick = async () => {
	const email = document.getElementById('email').value.trim();
	const password = document.getElementById('password').value.trim();
	const role = document.getElementById('role').value;

	if (!email || !password || !role) {
		alert('Please fill out all fields.');
		return;
	}

	const validRoles = ['student', 'teacher', 'admin'];
	if (!validRoles.includes(role)) {
		alert('❌ Invalid role selected.');
		return;
	}

	try {
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password,
		);
		const user = userCredential.user;

		// Store role in Firestore
		await setDoc(doc(db, 'users', user.uid), {
			email,
			role,
		});

		localStorage.setItem(
			'user',
			JSON.stringify({ email: user.email, role }),
		);
		alert('✅ Registration successful!');
		logEvent('Registration Success', { email: user.email, role });
		location.reload();
	} catch (error) {
		alert(`❌ Registration failed: ${error.message}`);
		logEvent('Registration Failed', error.message);
	}
};

// LOGOUT
logoutBtn.onclick = async () => {
	try {
		await signOut(auth);
		localStorage.removeItem('user');
		document.getElementById('dashboard').classList.add('hidden');
		document.getElementById('auth-section').classList.remove('hidden');
		alert('✅ Logged out successfully.');
		logEvent('Logout', 'User logged out.');
	} catch (error) {
		console.error('❌ Logout failed:', error);
		logEvent('Logout Failed', error.message);
	}
};
