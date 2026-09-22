// =====================================================
// HOMEPOT - PROCESSING PAYMENT
// =====================================================

document.addEventListener("DOMContentLoaded", function () {


    // =================================================
    // GET SAVED ORDER
    // =================================================

    const savedOrder =
        localStorage.getItem("homepotCurrentOrder");


    let orderTotal = 0;


    // =================================================
    // GET TOTAL
    // =================================================

    if (savedOrder) {

        try {

            const order =
                JSON.parse(savedOrder);

            orderTotal =
                Number(order.total) || 0;

        } catch (error) {

            console.log(
                "Unable to read saved order."
            );

        }

    }


    // =================================================
    // FORMAT MONEY
    // =================================================

    function formatMoney(amount) {

        return `₦${Number(amount).toLocaleString()}`;

    }


    // =================================================
    // SHOW PAYMENT AMOUNT
    // =================================================

    const processingAmount =
        document.getElementById(
            "processingAmount"
        );


    if (processingAmount) {

        processingAmount.textContent =
            formatMoney(orderTotal);

    }


    // =================================================
    // GET PAYMENT STEPS
    // =================================================

    const steps =
        document.querySelectorAll(".step");


    // Start from first step
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

    const paymentProcess =
        setInterval(function () {

            currentStep++;


            if (currentStep < steps.length) {

                activateStep(currentStep);

            } else {


                // Stop timer
                clearInterval(
                    paymentProcess
                );


                // Go to confirmation
                setTimeout(function () {

                    window.location.href =
                        "confirmed.html";

                }, 1000);

            }

        }, 2000);

});