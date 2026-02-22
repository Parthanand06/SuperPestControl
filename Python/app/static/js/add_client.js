document.getElementById("clientForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const payload = {
        user_name: document.getElementById("user_name").value,
        phone_no: document.getElementById("phone_no").value
    };

    fetch("/api/clients", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        const responseBox = document.getElementById("responseBox");

        if (data.user_id) {
            responseBox.style.color = "green";
            responseBox.innerHTML = `✅ Client Added Successfully! <br>User ID: ${data.user_id}`;

            document.getElementById("clientForm").reset();
        }
        else if (data.detail) {
            responseBox.style.color = "red";
            responseBox.innerHTML = `❌ ${data.detail}`;
        }
        else {
            responseBox.style.color = "orange";
            responseBox.innerHTML = "⚠️ Unexpected response received!";
        }
    })
    .catch(error => {
        console.error("Error:", error);
        const responseBox = document.getElementById("responseBox");
        responseBox.style.color = "red";
        responseBox.innerHTML = "❌ Failed to connect to server!";
    });
});
