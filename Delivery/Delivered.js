// ==============================
// ORDER DELIVERED PAGE
// ==============================

const rateButton = document.getElementById("rateButton");
const wrongButton = document.getElementById("wrongButton");

// Read the current order
let deliveredOrder = null;

try {
    deliveredOrder = JSON.parse(
        localStorage.getItem("homepotCurrentOrder") || "null"
    );
} catch (error) {
    console.error("Could not read order details:", error);
}

// Format Nigerian Naira
function formatDeliveredMoney(amount) {
    const value = Number(
        String(amount ?? 0).replace(/[₦,\s]/g, "")
    ) || 0;

    return "₦" + value.toLocaleString("en-NG");
}

// Display order number
const deliveredOrderNumber =
    document.getElementById("deliveredOrderNumber");

if (deliveredOrderNumber) {
    deliveredOrderNumber.textContent =
        deliveredOrder?.orderNumber || "Unavailable";
}

// Display amount paid
const amountPaid = document.getElementById("amountPaid");

if (amountPaid) {
    const amount =
        deliveredOrder?.total ??
        deliveredOrder?.amount;

    amountPaid.textContent =
        amount != null ? formatDeliveredMoney(amount) : "Unavailable";
}

// Display delivery time of day
const deliveredAt = document.getElementById("deliveredAt");

if (deliveredAt) {
    deliveredAt.textContent = new Date().toLocaleTimeString(
        "en-NG",
        { hour: "numeric", minute: "2-digit", hour12: true }
    );
}

// Display delivery duration if a start time was saved
const deliveryDuration = document.getElementById("deliveryDuration");

if (deliveryDuration) {
    const startTime = deliveredOrder?.createdAt;

    if (startTime) {
        const elapsedMinutes = Math.max(
            1,
            Math.round((Date.now() - new Date(startTime).getTime()) / 60000)
        );

        deliveryDuration.textContent = `${elapsedMinutes} minutes`;
    } else {
        deliveryDuration.textContent = "Unavailable";
    }
}

// Display selected chef if available
const deliveryDescription =
    document.getElementById("deliveryDescription");

if (deliveryDescription) {
    let chefName = deliveredOrder?.chefName ||
        (typeof deliveredOrder?.chef === "string"
            ? deliveredOrder.chef
            : "");

    if (!chefName) {
        const savedChef = localStorage.getItem("homepotSelectedChef");

        if (savedChef) {
            try {
                const chef = JSON.parse(savedChef);
                chefName = typeof chef === "string"
                    ? chef
                    : chef.name || chef.chefName || "";
            } catch (error) {
                chefName = savedChef;
            }
        }
    }

    deliveryDescription.textContent = chefName
        ? `Your food from ${chefName} has arrived. Enjoy your meal!`
        : "Your food has arrived. Enjoy your meal!";
}

// Rate Your Experience
if (rateButton) {
    rateButton.addEventListener("click", function () {
        window.location.href = "Experience.html";
    });
}

// Something Wrong?
if (wrongButton) {
    wrongButton.addEventListener("click", function () {
        window.location.href = "something-wrong.html";
    });
}