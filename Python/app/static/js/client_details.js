document.getElementById("searchForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const userId = document.getElementById("user_id").value;

    if (!userId) {
        document.getElementById("messageBox").innerHTML = "❌ Please enter User ID";
        document.getElementById("messageBox").style.color = "red";
        return;
    }

    // Redirect to actual details page
    window.location.href = `/userdetails-page/${userId}`;
});
