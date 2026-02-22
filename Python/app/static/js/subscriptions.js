document.getElementById("subscriptionForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const payload = {
        user_id: parseInt(document.getElementById("user_id").value),
        service_id: parseInt(document.getElementById("service_id").value),
        service_per_year: parseInt(document.getElementById("service_per_year").value),
        start_date: document.getElementById("start_date").value
    };

    fetch("/subscriptions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        const responseBox = document.getElementById("responseBox");

        if (data.order_id) {
            responseBox.style.color = "green";
            responseBox.innerHTML = `✅ Subscription Created Successfully! <br> Order ID: ${data.order_id}`;
            document.getElementById("subscriptionForm").reset();
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
