/* DISPLAY THE CURRENT ORDER DETAILS */
const savedOrder = JSON.parse(
    localStorage.getItem("homepotCurrentOrder") || "null"
);

// Format prices in Nigerian Naira
function formatDeliveryMoney(amount) {
    const number = Number(
        String(amount ?? 0).replace(/[₦,\s]/g, "")
    ) || 0;

    return "₦" + number.toLocaleString("en-NG");
}

// DISPLAY ORDER NUMBER — SAME METHOD AS READY.JS
const orderNumberElement =
    document.getElementById("orderNumber");

if (orderNumberElement) {
    if (savedOrder && savedOrder.orderNumber) {
        orderNumberElement.textContent =
            savedOrder.orderNumber;
    } else {
        orderNumberElement.textContent = "Unavailable";
    }
}

// Display delivery address
const addressElement = document.getElementById("deliveryAddress");

if (addressElement) {
    const savedAddress =
        savedOrder?.address ||
        localStorage.getItem("homepotDeliveryAddress");

    let addressText = "Address not available";

    if (typeof savedAddress === "string" && savedAddress.trim()) {
        addressText = savedAddress;
    } else if (savedAddress && typeof savedAddress === "object") {
        addressText = [
            savedAddress.address,
            savedAddress.street,
            savedAddress.city,
            savedAddress.state
        ].filter(Boolean).join(", ") || "Address not available";
    }

    addressElement.textContent = addressText;
}

// Display the SAME OTP generated on Ready.html
const deliveryOtpElement = document.getElementById("deliveryOtp");

if (deliveryOtpElement) {
    try {
        const savedOtp = JSON.parse(
            localStorage.getItem("homepotDeliveryOtp") || "null"
        );

        const orderId =
            savedOrder?.orderNumber || "current-order";

        if (
            savedOtp &&
            savedOtp.orderNumber === orderId &&
            Number(savedOtp.expiresAt) > Date.now() &&
            /^\d{4}$/.test(String(savedOtp.code))
        ) {
            deliveryOtpElement.textContent = savedOtp.code;
        } else {
            deliveryOtpElement.textContent = "Expired";
        }
    } catch (error) {
        deliveryOtpElement.textContent = "Unavailable";
    }
}

// Display the order summary
const orderSummaryElement = document.getElementById("orderSummary");

if (orderSummaryElement) {
    const items = Array.isArray(savedOrder?.items)
        ? savedOrder.items
        : [];

    const itemCount = items.reduce(
        (total, item) => total + (Number(item.quantity) || 1),
        0
    );

    const total =
        savedOrder?.total ??
        savedOrder?.amount ??
        0;

    orderSummaryElement.textContent =
        `${itemCount} ${itemCount === 1 ? "item" : "items"} · ` +
        `${formatDeliveryMoney(total)} paid`;
}const steps = document.querySelectorAll(".progress-step");
const lines = document.querySelectorAll(".progress-line");

const deliveryTitle = document.getElementById("delivery-title");
const deliveryMessage = document.getElementById("delivery-message");


// How long each stage stays active
const stageTime = 2500;


// Current stage
let currentStage = 0;


// Update the progress bar
function updateProgress() {

    steps.forEach((step, index) => {

        step.classList.remove(
            "completed",
            "current",
            "delivered"
        );

        const circle = step.querySelector(".status-circle");

        circle.textContent = "";


        // Stages before the current stage
        if (index < currentStage) {

            step.classList.add("completed");

            circle.textContent = "✓";
        }


        // Current stage
        else if (index === currentStage) {

            step.classList.add("current");
        }

    });


    // Update lines
    lines.forEach((line, index) => {

        if (index < currentStage) {

            line.classList.add("completed");

        } else {

            line.classList.remove("completed");

        }

    });
}


// Move to the next stage
function moveToNextStage() {

    currentStage++;

    updateProgress();


    /*
        When currentStage reaches 4,
        Delivered becomes orange.
    */
    if (currentStage === 4) {

        const delivered = steps[4];

        delivered.classList.remove("current");
        delivered.classList.add("delivered");

        const deliveredCircle =
            delivered.querySelector(".status-circle");

        deliveredCircle.textContent = "✓";


        // Change the message
        deliveryTitle.textContent = "Delivered!";

        deliveryMessage.textContent =
            "Your order has been delivered successfully.";


        /*
            Give the user time to see
            the orange Delivered status.
        */
        setTimeout(function () {

            window.location.href = "delivered.html";

        }, 1500);

        return;
    }


    /*
        Move to the next stage automatically.
    */
    setTimeout(moveToNextStage, stageTime);
}


// Start
updateProgress();


// Confirmed → Preparing
setTimeout(moveToNextStage, stageTime);