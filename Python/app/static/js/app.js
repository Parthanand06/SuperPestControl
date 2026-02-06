const API_URL = "/api/clients";

fetch(API_URL)
    .then(response => {
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }
        return response.json();
    })
    .then(data => {
        const tableBody = document.getElementById("client-table-body");
        tableBody.innerHTML = ""; // clear first

        data.forEach(client => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${client.user_id}</td>
                <td>${client.user_name}</td>
                <td>${client.phone_no}</td>
                <td>${new Date(client.created_ts).toLocaleString()}</td>
            `;
            tableBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error("Fetch error:", error);
        alert("Unable to load client data");
    });
