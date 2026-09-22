// ==========================================
// GET CURRENT ORDER NUMBER
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

}// ==========================================
// ORDER FULFILLMENT FLOW
// ==========================================

// Chef's phone number
const chefPhoneNumber = "+2348012345678";


// ==========================================
// GET ELEMENTS
// ==========================================

const confirmedStep = document.getElementById("confirmedStep");
const preparingStep = document.getElementById("preparingStep");
const readyStep = document.getElementById("readyStep");

const line1 = document.getElementById("line1");
const line2 = document.getElementById("line2");

const statusTitle = document.getElementById("statusTitle");
const statusMessage = document.getElementById("statusMessage");

const timeText = document.getElementById("timeText");
const timeLabel = document.getElementById("timeLabel");


// ==========================================
// RESET PROGRESS
// ==========================================

function resetProgress() {

    confirmedStep.classList.remove(
        "completed",
        "current-step"
    );

    preparingStep.classList.remove(
        "completed",
        "current-step"
    );

    readyStep.classList.remove(
        "completed",
        "current-step"
    );

    line1.classList.remove("completed-line");
    line2.classList.remove("completed-line");
}


// ==========================================
// CONFIRMED STATUS
// ==========================================

function showConfirmed() {

    resetProgress();

    confirmedStep.classList.add("current-step");

    statusTitle.innerHTML =
        "Your Order is<br>Confirmed!";

    statusMessage.textContent =
        "Your order has been confirmed. Chef Amaka will start preparing your meal shortly.";

    timeText.textContent = "~20 min";

    timeLabel.textContent =
        "Estimated prep time";
}


// ==========================================
// PREPARING STATUS
// ==========================================

function showPreparing() {

    resetProgress();

    confirmedStep.classList.add("completed");

    preparingStep.classList.add("current-step");

    line1.classList.add("completed-line");


    statusTitle.innerHTML =
        "Chef Amaka is<br>Cooking!";

    statusMessage.textContent =
        "Your order has been accepted and Chef Amaka is lovingly preparing your Banga Soup & Starch and Jollof Rice & Chicken.";

    timeText.textContent = "~20 min";

    timeLabel.textContent =
        "Estimated prep time";
}


// ==========================================
// READY STATUS
// ==========================================

function showReady() {

    resetProgress();

    confirmedStep.classList.add("completed");

    preparingStep.classList.add("completed");

    readyStep.classList.add("current-step");

    line1.classList.add("completed-line");

    line2.classList.add("completed-line");


    statusTitle.innerHTML =
        "Your Order is<br>Ready!";

    statusMessage.textContent =
        "Chef Amaka has finished preparing your order. Your food is ready for delivery.";

    timeText.textContent = "Ready!";

    timeLabel.textContent =
        "Your food is ready";
}


// ==========================================
// CALL CHEF
// ==========================================

const callChefBtn =
    document.getElementById("callChefBtn");

callChefBtn.addEventListener(
    "click",
    function () {

        const answer = confirm(
            "Do you want to call Chef Amaka?"
        );

        if (answer) {

            window.location.href =
                "tel:" + chefPhoneNumber;

        }

    }
);


// ==========================================
// NEED HELP
// ==========================================

const helpBtn =
    document.getElementById("helpBtn");

helpBtn.addEventListener(
    "click",
    function (event) {

        event.preventDefault();

        alert(
            "Need help with your order?\n\n" +
            "Please contact HomePot customer support."
        );

    }
);


// ==========================================
// START ORDER FLOW
// ==========================================

showConfirmed();


// ==========================================
// CONFIRMED → PREPARING
// 3 SECONDS
// ==========================================

setTimeout(function () {

    showPreparing();

}, 3000);


// ==========================================
// PREPARING → READY
// 8 SECONDS TOTAL
// ==========================================

setTimeout(function () {

    showReady();

}, 8000);


// ==========================================
// READY → ANOTHER PAGE
// 10 SECONDS TOTAL
// ==========================================

setTimeout(function () {

    window.location.href = "../Delivery/Ready.html";

}, 10000);