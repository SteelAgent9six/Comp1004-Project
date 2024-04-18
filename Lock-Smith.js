(function() {
    document.getElementById("clearDataButton").addEventListener("click", function(event) {
        event.preventDefault();
        localStorage.removeItem("credentials");
        refreshCredentialsTable();
        alert("Saved data has been cleared.");
    });
    document.getElementById("loginForm").addEventListener("submit", function(event) {
        event.preventDefault();
        var website = document.getElementById("website").value;
        var password = document.getElementById("password").value;
        if (website && password) {
            var credentials = JSON.parse(localStorage.getItem("credentials")) || [];
            credentials.push({ website: website, password: password });
            localStorage.setItem("credentials", JSON.stringify(credentials));
            document.getElementById("website").value = "";
            document.getElementById("password").value = "";
            alert("Website and password saved to local storage.");
            refreshCredentialsTable();
        } else {
            alert("Please fill in both website and password fields.");
        }
    });
    document.getElementById("searchButton").addEventListener("click", function(event) {
        event.preventDefault();
        var searchWebsite = document.getElementById("searchWebsite").value.toLowerCase();
        var credentials = JSON.parse(localStorage.getItem("credentials")) || [];
        var foundPassword = false;
        credentials.forEach(function(credential) {
            if (credential.website.toLowerCase() === searchWebsite) {
                alert("Password for " + credential.website + ": " + credential.password);
                foundPassword = true;
            }
        });
        if (!foundPassword) {
            alert("No password found for the entered website.");
        }
    });
    function refreshCredentialsTable() {
        var credentials = JSON.parse(localStorage.getItem("credentials")) || [];
        var tableBody = document.querySelector("#credentialsTable tbody");
        tableBody.innerHTML = "";
        credentials.forEach(function(credential) {
            var newRow = document.createElement("tr");
            newRow.innerHTML = "<td>" + credential.website + "</td><td>" + credential.password + "</td>";
            tableBody.appendChild(newRow);
        });
    }
    document.addEventListener("DOMContentLoaded", function() {
        refreshCredentialsTable();
    });
})();