export function renderAdminPanel(container) {
	container.innerHTML = `
    <h3>Admin Panel</h3>
    <input id="teacherName" placeholder="Teacher Name" />
    <input id="department" placeholder="Department" />
    <input id="subject" placeholder="Subject" />
    <button id="addTeacher">Add Teacher</button>
    <h4>Approve Students</h4>
    <div id="pendingStudents">
      <p>No pending students (mock)</p>
    </div>
  `;

	document.getElementById('addTeacher').onclick = () => {
		alert('Teacher added (mock)');
	};
}
