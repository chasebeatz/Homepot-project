// Wait until the page has completely loaded
document.addEventListener("DOMContentLoaded", function () {

    // Get all the payment steps
    const steps = document.querySelectorAll(".step");

    // Start from the first step
    let currentStep = 0;

    // Function to activate a payment step
    function activateStep(index) {

        steps.forEach(function (step, i) {
            if (i === index) {
                step.classList.add("active");
            } else {
                step.classList.remove("active");
            }
        });

    }

    // Show the first step immediately
    activateStep(currentStep);

    // Move to the next step every 2 seconds
    const paymentProcess = setInterval(function () {

        currentStep++;

        if (currentStep < steps.length) {
            activateStep(currentStep);
        } else {

            // Stop the timer when all steps are completed
            clearInterval(paymentProcess);

            // Wait 1 second, then open the next page
            setTimeout(function () {
                window.location.href = "confirmed.html";
            }, 1000);
        }

    }, 2000);


});