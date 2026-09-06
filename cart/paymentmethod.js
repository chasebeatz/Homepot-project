const paymentCards = document.querySelectorAll(".payment-card");
const continuePayment = document.getElementById("continuePayment");

let selectedPayment = "card";

// Select a payment method
paymentCards.forEach(function(card) {

    card.addEventListener("click", function() {

        // Remove selection from all cards
        paymentCards.forEach(function(item) {
            item.classList.remove("selected");
        });

        // Select the card that was touched
        card.classList.add("selected");

        // Remember the selected payment method
        selectedPayment = card.dataset.payment;
    });

});


// Continue button
continuePayment.addEventListener("click", function() {

    if (selectedPayment === "card") {

        window.location.href = "Cardpayment.html";

    } else if (selectedPayment === "bank") {

        window.location.href = "bank-transfer.html";

    } else if (selectedPayment === "wallet") {

        window.location.href = "wallet.html";

    }

});