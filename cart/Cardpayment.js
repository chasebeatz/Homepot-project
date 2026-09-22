// =====================================================
// HOMEPOT - CARD PAYMENT
// =====================================================


// =====================================================
// GET SAVED ORDER
// =====================================================

const savedOrder =
    localStorage.getItem("homepotCurrentOrder");

let order = null;

if (savedOrder) {

    try {

        order = JSON.parse(savedOrder);

    } catch (error) {

        console.log("Could not read saved order.");

    }

}


// =====================================================
// GET ORDER AMOUNTS
// =====================================================

const subtotal =
    order ? Number(order.subtotal) || 0 : 0;

const deliveryFee =
    order ? Number(order.deliveryFee) || 0 : 0;

const serviceFee =
    order ? Number(order.serviceFee) || 0 : 0;

const orderTotal =
    order ? Number(order.total) || 0 : 0;


// =====================================================
// FORMAT MONEY
// =====================================================

function formatMoney(amount) {

    return `₦${Number(amount).toLocaleString()}`;

}


// =====================================================
// SHOW SUBTOTAL
// =====================================================

const cardSubtotal =
    document.getElementById("cardSubtotal");

if (cardSubtotal) {

    cardSubtotal.textContent =
        formatMoney(subtotal);

}


// =====================================================
// SHOW DELIVERY FEE
// =====================================================

const cardDeliveryFee =
    document.getElementById("cardDeliveryFee");

if (cardDeliveryFee) {

    if (deliveryFee === 0) {

        cardDeliveryFee.textContent =
            "FREE";

    } else {

        cardDeliveryFee.textContent =
            formatMoney(deliveryFee);

    }

}


// =====================================================
// SHOW SERVICE FEE
// =====================================================

const cardServiceFee =
    document.getElementById("cardServiceFee");

if (cardServiceFee) {

    cardServiceFee.textContent =
        formatMoney(serviceFee);

}


// =====================================================
// SHOW TOTAL IN ORDER SUMMARY
// =====================================================

const summaryTotal =
    document.getElementById("summaryTotal");

if (summaryTotal) {

    summaryTotal.textContent =
        formatMoney(orderTotal);

}


// =====================================================
// SHOW TOTAL AT TOP
// =====================================================

const cardPaymentTotal =
    document.getElementById("cardPaymentTotal");

if (cardPaymentTotal) {

    cardPaymentTotal.textContent =
        formatMoney(orderTotal);

}


// =====================================================
// SHOW TOTAL ON PAY BUTTON
// =====================================================

const payAmount =
    document.getElementById("payAmount");

if (payAmount) {

    payAmount.textContent =
        formatMoney(orderTotal);

}


// =====================================================
// GET FORM ELEMENTS
// =====================================================

const cardNumber =
    document.getElementById("cardNumber");

const expiry =
    document.getElementById("expiry");

const cvv =
    document.getElementById("cvv");

const cardholder =
    document.getElementById("cardholder");

const previewName =
    document.getElementById("previewName");

const previewExpiry =
    document.getElementById("previewExpiry");

const paymentForm =
    document.getElementById("paymentForm");

const errorMessage =
    document.getElementById("errorMessage");


// =====================================================
// CARD NUMBER
// =====================================================

if (cardNumber) {

    cardNumber.addEventListener("input", function () {

        let value =
            this.value.replace(/\D/g, "");

        value =
            value.substring(0, 16);

        let formattedValue = "";

        for (
            let i = 0;
            i < value.length;
            i++
        ) {

            if (
                i > 0 &&
                i % 4 === 0
            ) {

                formattedValue += " ";

            }

            formattedValue += value[i];

        }

        this.value =
            formattedValue;

    });

}


// =====================================================
// EXPIRY DATE
// =====================================================

if (expiry) {

    expiry.addEventListener("input", function () {

        let value =
            this.value.replace(/\D/g, "");

        value =
            value.substring(0, 4);

        if (value.length >= 3) {

            this.value =
                value.substring(0, 2) +
                "/" +
                value.substring(2, 4);

        } else {

            this.value =
                value;

        }


        if (previewExpiry) {

            if (this.value.length > 0) {

                previewExpiry.textContent =
                    this.value;

            } else {

                previewExpiry.textContent =
                    "--/--";

            }

        }

    });

}


// =====================================================
// CVV
// =====================================================

if (cvv) {

    cvv.addEventListener("input", function () {

        this.value =
            this.value.replace(/\D/g, "");

        this.value =
            this.value.substring(0, 3);

    });

}


// =====================================================
// CARDHOLDER NAME
// =====================================================

if (cardholder) {

    cardholder.addEventListener("input", function () {

        const name =
            this.value.trim();

        if (previewName) {

            if (name.length > 0) {

                previewName.textContent =
                    name.toUpperCase();

            } else {

                previewName.textContent =
                    "ADA OKONKWO";

            }

        }

    });

}


// =====================================================
// PAYMENT FORM
// =====================================================

if (paymentForm) {

    paymentForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            // Clear error
            if (errorMessage) {

                errorMessage.textContent = "";

            }


            // Get values
            const cardNumberValue =
                cardNumber.value.replace(/\s/g, "");

            const expiryValue =
                expiry.value;

            const cvvValue =
                cvv.value;

            const cardholderValue =
                cardholder.value.trim();


            // =================================================
            // CHECK CARD NUMBER
            // =================================================

            if (
                cardNumberValue.length !== 16
            ) {

                errorMessage.textContent =
                    "Please enter a valid 16-digit card number.";

                cardNumber.focus();

                return;

            }


            // =================================================
            // CHECK EXPIRY
            // =================================================

            if (
                !/^\d{2}\/\d{2}$/.test(
                    expiryValue
                )
            ) {

                errorMessage.textContent =
                    "Please enter the expiry date as MM/YY.";

                expiry.focus();

                return;

            }


            // =================================================
            // CHECK MONTH
            // =================================================

            const month =
                parseInt(
                    expiryValue.substring(0, 2)
                );


            if (
                month < 1 ||
                month > 12
            ) {

                errorMessage.textContent =
                    "Please enter a valid expiry month.";

                expiry.focus();

                return;

            }


            // =================================================
            // CHECK CVV
            // =================================================

            if (
                cvvValue.length !== 3
            ) {

                errorMessage.textContent =
                    "CVV must contain 3 digits.";

                cvv.focus();

                return;

            }


            // =================================================
            // CHECK CARDHOLDER
            // =================================================

            if (
                cardholderValue.length < 3
            ) {

                errorMessage.textContent =
                    "Please enter the cardholder name.";

                cardholder.focus();

                return;

            }


            // =================================================
            // PAYMENT SUCCESS
            // =================================================

            window.location.href =
                "processing.html";

        }
    );

}