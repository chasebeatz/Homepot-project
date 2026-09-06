// ================================
// GET ELEMENTS
// ================================

const cardNumber = document.getElementById("cardNumber");
const expiry = document.getElementById("expiry");
const cvv = document.getElementById("cvv");
const cardholder = document.getElementById("cardholder");

const previewName = document.getElementById("previewName");
const previewExpiry = document.getElementById("previewExpiry");

const paymentForm = document.getElementById("paymentForm");
const errorMessage = document.getElementById("errorMessage");


// ================================
// CARD NUMBER
// ================================

cardNumber.addEventListener("input", function () {

    // Remove anything that is not a number
    let value = this.value.replace(/\D/g, "");

    // Maximum 16 digits
    value = value.substring(0, 16);

    // Add a space after every 4 digits
    let formattedValue = "";

    for (let i = 0; i < value.length; i++) {

        if (i > 0 && i % 4 === 0) {
            formattedValue += " ";
        }

        formattedValue += value[i];
    }

    this.value = formattedValue;
});


// ================================
// EXPIRY DATE
// ================================

expiry.addEventListener("input", function () {

    // Keep numbers only
    let value = this.value.replace(/\D/g, "");

    // IMPORTANT:
    // Allow exactly 4 numbers before adding the slash
    value = value.substring(0, 4);

    // Add slash after the first 2 numbers
    if (value.length >= 3) {

        this.value =
            value.substring(0, 2) +
            "/" +
            value.substring(2, 4);

    } else {

        this.value = value;
    }

    // Show it on the card
    if (this.value.length > 0) {
        previewExpiry.textContent = this.value;
    } else {
        previewExpiry.textContent = "--/--";
    }
});


// ================================
// CVV
// ================================

cvv.addEventListener("input", function () {

    // Numbers only
    this.value = this.value.replace(/\D/g, "");

    // Maximum 3 digits
    this.value = this.value.substring(0, 3);
});


// ================================
// CARDHOLDER NAME
// ================================

cardholder.addEventListener("input", function () {

    const name = this.value.trim();

    if (name.length > 0) {

        previewName.textContent =
            name.toUpperCase();

    } else {

        previewName.textContent =
            "ADA OKONKWO";
    }
});


// ================================
// PAYMENT FORM
// ================================

paymentForm.addEventListener("submit", function (event) {

    event.preventDefault();

    errorMessage.textContent = "";


    // Get values
    const cardNumberValue =
        cardNumber.value.replace(/\s/g, "");

    const expiryValue =
        expiry.value;

    const cvvValue =
        cvv.value;

    const cardholderValue =
        cardholder.value.trim();


    // ============================
    // CHECK CARD NUMBER
    // ============================

    if (cardNumberValue.length !== 16) {

        errorMessage.textContent =
            "Please enter a valid 16-digit card number.";

        cardNumber.focus();

        return;
    }


    // ============================
    // CHECK EXPIRY
    // ============================

    if (!/^\d{2}\/\d{2}$/.test(expiryValue)) {

        errorMessage.textContent =
            "Please enter the expiry date as MM/YY.";

        expiry.focus();

        return;
    }


    // Get month
    const month =
        parseInt(expiryValue.substring(0, 2));


    // Month must be between 01 and 12
    if (month < 1 || month > 12) {

        errorMessage.textContent =
            "Please enter a valid expiry month.";

        expiry.focus();

        return;
    }


    // ============================
    // CHECK CVV
    // ============================

    if (cvvValue.length !== 3) {

        errorMessage.textContent =
            "CVV must contain 3 digits.";

        cvv.focus();

        return;
    }


    // ============================
    // CHECK CARDHOLDER NAME
    // ============================

    if (cardholderValue.length < 3) {

        errorMessage.textContent =
            "Please enter the cardholder name.";

        cardholder.focus();

        return;
    }


    // ============================
    // SUCCESS
    // ============================

    window.location.href = "processing.html";

});