
    // Get the form and password fields
    const form = document.querySelector("form");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");

    form.addEventListener("submit", function (event) {

        // Check if passwords are different
        if (password.value !== confirmPassword.value) {

            // Stop the form from going to the next page
            event.preventDefault();

            // Show an error message
            alert("Passwords do not match. Please enter the same password in both fields.");

            // Put the cursor back in Confirm Password
            confirmPassword.focus();

            return;
        }

        const firstName = document.getElementById("firstName");
        const userName = firstName.value.trim() || "Customer";
        localStorage.setItem("homepotSignedInUser", userName);

        // If they match, the form will continue normally
        // and go to accountcreated.html
    });
