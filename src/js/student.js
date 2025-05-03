export function renderStudentPanel(container) {
	// Mocked appointment data array — make it persistent if needed
	let appointments = [];

	container.innerHTML = `
    <div class="panel-card">
      <h3>Student Panel</h3>
      <h4>Your Appointments</h4>
      <div class="content" id="student-appointments">
        <p>No appointments booked yet.</p>
      </div>
    </div>

    <div class="panel-card">
      <h4>Book an Appointment</h4>
      <div class="content">
        <input type="text" id="teacherName" placeholder="Teacher Name" />
        <textarea id="appointmentReason" placeholder="Reason for Appointment"></textarea>
        <input type="text" id="appointmentTime" placeholder="Preferred Time (e.g., 2:00 PM)" />
        <button id="bookAppointment">Book Appointment</button>
      </div>
    </div>
  `;

	// Book button logic
	document.getElementById('bookAppointment').onclick = () => {
		const teacherName = document.getElementById('teacherName').value.trim();
		const reason = document
			.getElementById('appointmentReason')
			.value.trim();
		const time = document.getElementById('appointmentTime').value.trim();

		if (teacherName && reason && time) {
			const appointment = {
				teacherName,
				reason,
				time,
				status: 'Pending',
			};

			appointments.push(appointment);
			updateAppointmentsList();
		} else {
			alert('Please fill out all fields.');
		}
	};

	// Update appointments in DOM
	function updateAppointmentsList() {
		const appointmentsContainer = document.getElementById(
			'student-appointments',
		);
		if (appointments.length === 0) {
			appointmentsContainer.innerHTML =
				'<p>No appointments booked yet.</p>';
		} else {
			appointmentsContainer.innerHTML = appointments
				.map(
					(appointment, index) => `
        <div class="appointment-card">
          <p><strong>Teacher:</strong> ${appointment.teacherName}</p>
          <p><strong>Reason:</strong> ${appointment.reason}</p>
          <p><strong>Time:</strong> ${appointment.time}</p>
          <p><strong>Status:</strong> ${appointment.status}</p>
          <button onclick="approveAppointment(${index})">Approve</button>
          <button onclick="rejectAppointment(${index})">Reject</button>
        </div>
      `,
				)
				.join('');
		}
	}

	// Expose approve/reject to global scope
	window.approveAppointment = function (index) {
		appointments[index].status = 'Approved';
		updateAppointmentsList();
	};

	window.rejectAppointment = function (index) {
		appointments[index].status = 'Rejected';
		updateAppointmentsList();
	};
}
