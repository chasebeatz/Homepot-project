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

}
// ==========================================
// DISPLAY SELECTED CHEF
// ==========================================

const savedChef = localStorage.getItem("homepotSelectedChef");

let chefName = "your chef";

if (savedChef) {
    try {
        const chef = JSON.parse(savedChef);

        chefName = typeof chef === "string"
            ? chef
            : chef.name || chef.chefName || chefName;
    } catch (error) {
        chefName = savedChef;
    }
}

if (currentOrder) {
    chefName =
        currentOrder.chefName ||
        (typeof currentOrder.chef === "string"
            ? currentOrder.chef
            : chefName);
}

const readyMessage = document.getElementById("readyMessage");

if (readyMessage) {
    readyMessage.textContent =
        `${chefName} has finished preparing your order. ` +
        "A delivery rider will collect it shortly. Show the code " +
        "to the rider when your food arrives.";
}
document.addEventListener("DOMContentLoaded", function () {

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

// ==========================================
// GENERATE AND DISPLAY DEMO DELIVERY OTP
// ======================== ==================

const otpContainer = document.getElementById("deliveryOtp");

if (otpContainer) {
    const OTP_KEY = "homepotDeliveryOtp";

    let savedOtp = null;

    try {
        savedOtp = JSON.parse(localStorage.getItem(OTP_KEY));
    } catch (error) {
        savedOtp = null;
    }

    const orderId = currentOrder?.orderNumber || "current-order";
    const now = Date.now();

    // Reuse the code if it belongs to this order
    // and has not expired.
    if (
        !savedOtp ||
        savedOtp.orderNumber !== orderId ||
        !savedOtp.expiresAt ||
        savedOtp.expiresAt <= now ||
        !/^\d{4}$/.test(String(savedOtp.code))
    ) {
        savedOtp = {
            orderNumber: orderId,
            code: String(Math.floor(1000 + Math.random() * 9000)),
            expiresAt: now + 30 * 60 * 1000
        };

        localStorage.setItem(OTP_KEY, JSON.stringify(savedOtp));
    }

    otpContainer.replaceChildren();

    if (Date.now() < savedOtp.expiresAt) {
        for (const digit of savedOtp.code) {
            const span = document.createElement("span");
            span.textContent = digit;
            otpContainer.appendChild(span);
        }
    } else {
        otpContainer.textContent = "Expired";
    }
}