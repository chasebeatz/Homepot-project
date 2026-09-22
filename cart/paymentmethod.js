// =========================================================
// GET PAYMENT CARDS AND CONTINUE BUTTON
// =========================================================

const paymentCards = document.querySelectorAll(".payment-card");
const continuePayment = document.getElementById("continuePayment");


// =========================================================
// GET SAVED ORDER TOTAL
// =========================================================

const savedOrder = localStorage.getItem("homepotCurrentOrder");

if (savedOrder) {

    const order = JSON.parse(savedOrder);

    const orderTotal = document.getElementById("orderTotal");

    if (orderTotal) {

        orderTotal.textContent =
            Number(order.total).toLocaleString();

    }

}


// =========================================================
// DEFAULT PAYMENT METHOD
// =========================================================

let selectedPayment = "card";


// =========================================================
// SELECT A PAYMENT METHOD
// =========================================================

paymentCards.forEach(function(card) {

    card.addEventListener("click", function() {

        // Remove selection from all payment cards
        paymentCards.forEach(function(item) {

            item.classList.remove("selected");

        });


        // Select the card that was clicked
        card.classList.add("selected");


        // Remember selected payment method
        selectedPayment =
            card.dataset.payment;

    });

});


// =========================================================
// CONTINUE BUTTON
// =========================================================

continuePayment.addEventListener("click", function() {

    if (selectedPayment === "card") {

        window.location.href =
            "Cardpayment.html";

    }

    else if (selectedPayment === "bank") {

        window.location.href =
            "bank-transfer.html";

    }

    else if (selectedPayment === "wallet") {

        window.location.href =
            "wallet.html";

    }

});