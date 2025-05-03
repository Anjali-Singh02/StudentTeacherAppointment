export function renderTeacherPanel(container) {
	container.innerHTML = `
    <h3>Teacher Panel</h3>
    <div class="appointment-section">
      <h4>Your Appointments</h4>
      <div id="teacher-appointments">
        <p>Loading appointments...</p>
      </div>
    </div>
    <div class="message-section">
      <h4>Messages from Students</h4>
      <div id="teacher-messages">
        <p>No messages yet.</p>
      </div>
    </div>
  `;

	const appointmentsContainer = container.querySelector(
		'#teacher-appointments',
	);
	appointmentsContainer.innerHTML = `
    <div class="appointment-card">
      <p><strong>Student:</strong> student1@example.com</p>
      <p><strong>Reason:</strong> Need help with assignment</p>
      <p><strong>Time:</strong> 2:00 PM</p>
      <p><strong>Status:</strong> Pending</p>
      <button>Approve</button> <button>Reject</button>
    </div>
  `;
}
