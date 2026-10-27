// =====================================================
// HOMEPOT - PROCESSING PAYMENT
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    // =================================================
    // GET SAVED ORDER
    // =================================================

    const savedOrder = localStorage.getItem("homepotCurrentOrder");

    let order = {};
    let orderTotal = 0;

    if (savedOrder) {
        try {
            order = JSON.parse(savedOrder);

            orderTotal = Number(order.total) || 0;

        } catch (error) {
            console.log("Unable to read saved order.");
        }
    }

    // =================================================
    // GET SELECTED CHEF
    // =================================================

    // Prefer the chef saved with this specific order.
    // Fall back to the selected chef saved earlier.

    const savedChef = localStorage.getItem("homepotSelectedChef");

    const chefName =
        order.chefName ||
        order.chef ||
        savedChef ||
        "your selected chef";

    // =================================================
    // DISPLAY CHEF NAME
    // =================================================

    const chefConfirmation =
        document.getElementById("chefConfirmation");

    if (chefConfirmation) {
        chefConfirmation.textContent =
            `Confirming with ${chefName}...`;
    }

    // =================================================
    // FORMAT MONEY
    // =================================================

    function formatMoney(amount) {
        return `₦${Number(amount).toLocaleString("en-NG")}`;
    }

    // =================================================
    // SHOW PAYMENT AMOUNT
    // =================================================

    const processingAmount =
        document.getElementById("processingAmount");

    if (processingAmount) {
        processingAmount.textContent =
            formatMoney(orderTotal);
    }

    // =================================================
    // GET PAYMENT STEPS
    // =================================================

    const steps = document.querySelectorAll(".step");

    let currentStep = 0;

    // =================================================
    // ACTIVATE STEP
    // =================================================

    function activateStep(index) {

        steps.forEach(function (step, i) {

            if (i === index) {
                step.classList.add("active");
            } else {
                step.classList.remove("active");
            }

        });

    }

    // =================================================
    // SHOW FIRST STEP
    // =================================================

    activateStep(currentStep);

    // =================================================
    // MOVE THROUGH PAYMENT STEPS
    // =================================================

    const paymentProcess = setInterval(function () {

        currentStep++;

        if (currentStep < steps.length) {

            activateStep(currentStep);

        } else {

            clearInterval(paymentProcess);

            setTimeout(function () {

                window.location.href = "confirmed.html";

            }, 1000);

        }

    }, 2000);

});