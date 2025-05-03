// Import Firestore methods
import {
	collection,
	addDoc,
} from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js';
import { db } from './firebase-config.js';

import { renderStudentPanel } from './student.js';
import { renderTeacherPanel } from './teacher.js';
import { renderAdminPanel } from './admin.js';
// Test Firestore connection (optional)
async function testFirestoreConnection() {
	try {
		const docRef = await addDoc(collection(db, 'test-collection'), {
			message: 'Hello from Firestore!',
			timestamp: new Date(),
		});
		console.log('✅ Firestore write successful. Document ID:', docRef.id);
	} catch (e) {
		console.error('❌ Firestore write failed:', e);
	}
}
testFirestoreConnection(); // Call test

// Handle user login session
const user = JSON.parse(localStorage.getItem('user'));

if (user) {
	document.getElementById('auth-section').classList.add('hidden');
	document.getElementById('dashboard').classList.remove('hidden');
	document.getElementById('userName').innerText = user.email.split('@')[0];
	showDashboard(user.role, user.email);
}

// Logout logic
document.getElementById('logout').onclick = () => {
	localStorage.removeItem('user');
	location.reload();
};

// Dynamically load role-based panel and display relevant button
function showDashboard(role, email) {
	const panelContent = document.getElementById('panel-content');
	panelContent.innerHTML = '';

	// Show only the appropriate panel button
	const studentBtn = document.getElementById('student-panel');
	const teacherBtn = document.getElementById('teacher-panel');
	const adminBtn = document.getElementById('admin-panel');

	studentBtn.style.display = 'none';
	teacherBtn.style.display = 'none';
	adminBtn.style.display = 'none';

	if (role === 'student') {
		studentBtn.style.display = 'inline-block';
		renderStudentPanel(panelContent); // Render Student Panel
	} else if (role === 'teacher') {
		teacherBtn.style.display = 'inline-block';
		renderTeacherPanel(panelContent); // Render Teacher Panel
	} else if (role === 'admin') {
		adminBtn.style.display = 'inline-block';
		renderAdminPanel(panelContent); // Render Admin Panel
	}
}
