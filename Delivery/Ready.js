// ==========================================
// GET CURRENT ORDER
// ==========================================

const savedOrder =
    localStorage.getItem("homepotCurrentOrder");

let currentOrder = null;

if (savedOrder) {

    try {

        currentOrder =
            JSON.parse(savedOrder);

    } catch (error) {

        console.log(
            "Could not read current order.",
            error
        );

    }

}


// ==========================================
// DISPLAY ORDER NUMBER
// ==========================================

const orderNumberElement =
    document.getElementById("orderNumber");

if (orderNumberElement) {

    if (
        currentOrder &&
        currentOrder.orderNumber
    ) {

        orderNumberElement.textContent =
            currentOrder.orderNumber;

    } else {

        orderNumberElement.textContent =
            "Unavailable";

    }

}document.addEventListener("DOMContentLoaded", function () {

    const steps = document.querySelectorAll(".step");
    const lines = document.querySelectorAll(".line");

    /*
        Change this to the name of the page
        you want to open after Delivering.
        
        Example:
        const nextPage = "delivery.html";
    */

    const nextPage = "delivery.html";


    /*
        Stage order:

        0 = Confirmed
        1 = Preparing
        2 = Ready
        3 = Delivering
        4 = Delivered
    */

    let currentStep = 0;


    function updateProgress() {

        steps.forEach((step, index) => {

            const circle = step.querySelector(".circle");

            // Completed stages
            if (index < currentStep) {

                step.classList.add("completed");
                step.classList.remove("delivering");

                circle.textContent = "✓";
            }

            // Current stage
            else if (index === currentStep) {

                step.classList.remove("completed");

                if (index === 3) {
                    step.classList.add("delivering");
                    circle.textContent = "";
                } else {
                    step.classList.remove("delivering");
                    circle.textContent = "";
                }

            }

            // Future stages
            else {

                step.classList.remove("completed");
                step.classList.remove("delivering");

                circle.textContent = "";
            }

        });


        /*
            Colour the lines that have already
            been passed.
        */

        lines.forEach((line, index) => {

            if (index < currentStep) {
                line.classList.add("completed-line");
            } else {
                line.classList.remove("completed-line");
            }

        });

    }


    /*
        STARTING POSITION

        Confirmed is already completed,
        so we start with Preparing.
    */

    currentStep = 1;

    updateProgress();


    /*
        Move to the next stage every 3 seconds.
    */

    const progressTimer = setInterval(function () {

        currentStep++;

        updateProgress();


        /*
            When we reach DELIVERING:
            
            - Confirmed = ✓
            - Preparing = ✓
            - Ready = ✓
            - Delivering = yellow
            - Delivered = empty
        */

        if (currentStep === 3) {

            clearInterval(progressTimer);

            /*
                Keep Delivering visible for 3 seconds,
                then go to the next page.
            */

            setTimeout(function () {

                window.location.href = "Delivery.html";

            }, 3000);

        }

    }, 3000);

});