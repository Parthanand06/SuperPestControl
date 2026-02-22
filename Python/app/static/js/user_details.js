function formatDate(dateStr) {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString();
}

fetch(`/userdetails/${USER_ID}`)
    .then(response => response.json())
    .then(data => {
        const userInfoDiv = document.getElementById("user-info");
        const visitTableBody = document.getElementById("visit-table-body");

        if (data.length === 0) {
            userInfoDiv.innerHTML = "<b>No user details found.</b>";
            return;
        }

        const first = data[0];

        // User + subscription info (from first record)
        userInfoDiv.innerHTML = `
            <div class="info-item">
                <span class="info-label">User ID</span>
                <span class="info-value">${first.user_id}</span>
            </div>

            <div class="info-item">
                <span class="info-label">User Name</span>
                <span class="info-value">${first.user_name}</span>
            </div>

            <div class="info-item">
                <span class="info-label">Phone No</span>
                <span class="info-value">${first.phone_no}</span>
            </div>

            <div class="info-item">
                <span class="info-label">Service Name</span>
                <span class="info-value">${first.service_name}</span>
            </div>

            <div class="info-item">
                <span class="info-label">Service Per Year</span>
                <span class="info-value">${first.service_per_year}</span>
            </div>

            <div class="info-item">
                <span class="info-label">Status</span>
                <span class="info-value">${first.status}</span>
            </div>

            <div class="info-item">
                <span class="info-label">Start Date</span>
                <span class="info-value">${formatDate(first.start_date)}</span>
            </div>

            <div class="info-item">
                <span class="info-label">End Date</span>
                <span class="info-value">${formatDate(first.end_date)}</span>
            </div>
        `;

        // Visit table
        visitTableBody.innerHTML = "";

        data.forEach(row => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${formatDate(row.visit_date)}</td>
                <td>${row.visit_status}</td>
            `;
            visitTableBody.appendChild(tr);
        });

    })
    .catch(error => {
        console.error("Error:", error);
        document.getElementById("user-info").innerHTML = "❌ Failed to load user details.";
    });
