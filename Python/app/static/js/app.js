let clientsData = [];

function renderTable(data) {
    const tableBody = document.getElementById("client-table-body");
    tableBody.innerHTML = "";

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
}

// Fetch clients
fetch("/api/clients")
    .then(response => response.json())
    .then(data => {
        clientsData = data;
        renderTable(clientsData);
    })
    .catch(error => {
        console.error("Error:", error);
    });

// Search filter
document.getElementById("searchInput").addEventListener("keyup", function() {
    const searchValue = this.value.toLowerCase();

    const filteredData = clientsData.filter(client =>
        client.user_name.toLowerCase().includes(searchValue)
    );

    renderTable(filteredData);
});

row.innerHTML = `
    <td><a href="/userdetails-page/${client.user_id}">${client.user_id}</a></td>
    <td>${client.user_name}</td>
    <td>${client.phone_no}</td>
    <td>${new Date(client.created_ts).toLocaleString()}</td>
`;
