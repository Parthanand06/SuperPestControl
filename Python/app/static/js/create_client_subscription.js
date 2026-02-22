document.getElementById("clientSubscriptionForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const responseBox = document.getElementById("responseBox");
    responseBox.innerHTML = "⏳ Processing...";
    responseBox.style.color = "blue";

    try {
        // Step 1: Create Client
        const clientPayload = {
            user_name: document.getElementById("user_name").value,
            phone_no: document.getElementById("phone_no").value
        };

        const clientRes = await fetch("/add-client", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(clientPayload)
        });

        const clientData = await clientRes.json();

        if (!clientRes.ok) {
            responseBox.style.color = "red";
            responseBox.innerHTML = `❌ Client creation failed: ${clientData.detail || "Error"}`;
            return;
        }

        const userId = clientData.user_id;

        // Step 2: Create Subscription
        const subscriptionPayload = {
            user_id: userId,
            service_id: parseInt(document.getElementById("service_id").value),
            service_per_year: parseInt(document.getElementById("service_per_year").value),
            start_date: document.getElementById("start_date").value
        };

        const subRes = await fetch("/subscriptions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(subscriptionPayload)
        });

        const subData = await subRes.json();

        if (!subRes.ok) {
            responseBox.style.color = "red";
            responseBox.innerHTML = `❌ Subscription failed: ${subData.detail || "Error"}`;
            return;
        }

        responseBox.style.color = "green";
        responseBox.innerHTML = `✅ Client Subscription Created Successfully! <br>
                                 User ID: ${userId} <br>
                                 Order ID: ${subData.order_id}`;

        document.getElementById("clientSubscriptionForm").reset();

    } catch (error) {
        console.error(error);
        responseBox.style.color = "red";
        responseBox.innerHTML = "❌ Server connection error!";
    }
});
