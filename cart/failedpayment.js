// Retry Payment button
const retryPayment = document.getElementById("retryPayment");

// Different Card button
const differentCard = document.getElementById("differentCard");


// Retry Payment
retryPayment.addEventListener("click", function () {

    // Change this to the page where your card payment form is located
    window.location.href = "payment.html";

});


// Use a Different Card
differentCard.addEventListener("click", function () {

    // Change this to your card-payment page
    window.location.href = "payment.html";

});