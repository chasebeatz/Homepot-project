// =====================================================
// HOMEPOT - ORDER CONFIRMED
// =====================================================

document.addEventListener("DOMContentLoaded", function () {


    // =================================================
    // GET ELEMENTS
    // =================================================

    const orderNumberElement =
        document.getElementById("orderNumber");

    const deliveryElement =
        document.getElementById("estimatedDelivery");

    const addressElement =
        document.getElementById("confirmedAddress");

    const paymentElement =
        document.getElementById("confirmedPaymentMethod");

    const amountElement =
        document.getElementById("confirmedAmount");


    const previousBtn =
        document.getElementById("previousBtn");

    const nextBtn =
        document.getElementById("nextBtn");


    // =================================================
    // GET SAVED ORDER
    // =================================================

    const savedOrder =
        localStorage.getItem(
            "homepotCurrentOrder"
        );


    // =================================================
    // CHECK ORDER
    // =================================================

    if (!savedOrder) {

        console.log(
            "No current order was found."
        );

        if (orderNumberElement) {
            orderNumberElement.textContent =
                "No Order";
        }

        if (deliveryElement) {
            deliveryElement.textContent =
                "Unavailable";
        }

        if (addressElement) {
            addressElement.textContent =
                "Unavailable";
        }

        if (paymentElement) {
            paymentElement.textContent =
                "Unavailable";
        }

        if (amountElement) {
            amountElement.textContent =
                "₦0";
        }

        return;
    }


    // =================================================
    // READ ORDER
    // =================================================

    let order;

    try {

        order =
            JSON.parse(savedOrder);

    } catch (error) {

        console.log(
            "Could not read the saved order.",
            error
        );

        return;
    }


    // =================================================
    // FORMAT MONEY
    // =================================================

    function formatMoney(amount) {

        return `₦${Number(amount).toLocaleString()}`;

    }


    // =================================================
    // ORDER NUMBER
    // =================================================

    let orderNumber =
        order.orderNumber;


    /*
       If an order number does not already exist,
       create one.

       Example:

       HP-20260922-5834
    */

    if (!orderNumber) {

        const now =
            new Date();

        const year =
            now.getFullYear();

        const month =
            String(
                now.getMonth() + 1
            ).padStart(2, "0");

        const day =
            String(
                now.getDate()
            ).padStart(2, "0");

        const randomNumber =
            Math.floor(
                1000 + Math.random() * 9000
            );


        orderNumber =
            `HP-${year}${month}${day}-${randomNumber}`;


        // Save the order number
        order.orderNumber =
            orderNumber;


        localStorage.setItem(
            "homepotCurrentOrder",
            JSON.stringify(order)
        );

    }


    // =================================================
    // DELIVERY TIME
    // =================================================

    let deliveryTime =
        order.deliveryTime;


    /*
       If Review.js has not created a delivery
       time yet, create one for this order.

       This is a FRONTEND demo estimate.
    */

    if (!deliveryTime) {

        const deliveryOptions = [

            "25 – 35 minutes",
            "30 – 40 minutes",
            "35 – 45 minutes",
            "40 – 50 minutes"

        ];


        const randomIndex =
            Math.floor(
                Math.random() *
                deliveryOptions.length
            );


        deliveryTime =
            deliveryOptions[randomIndex];


        order.deliveryTime =
            deliveryTime;


        localStorage.setItem(
            "homepotCurrentOrder",
            JSON.stringify(order)
        );

    }


    // =================================================
    // DELIVERY ADDRESS
    // =================================================

    const address =
        order.address ||
        localStorage.getItem(
            "homepotDeliveryAddress"
        ) ||
        "Address not available";


    // =================================================
    // PAYMENT METHOD
    // =================================================

    let paymentMethod =
        order.paymentMethod;


    if (!paymentMethod) {

        paymentMethod =
            "Card";

    }


    // =================================================
    // CARD LAST FOUR DIGITS
    // =================================================

    if (
        order.cardLastFour &&
        paymentMethod.toLowerCase() === "card"
    ) {

        paymentMethod =
            `Visa •••• ${order.cardLastFour}`;

    }


    // =================================================
    // TOTAL
    // =================================================

    const amountPaid =
        Number(order.total) || 0;


    // =================================================
    // DISPLAY ORDER NUMBER
    // =================================================

    if (orderNumberElement) {

        orderNumberElement.textContent =
            orderNumber;

    }


    // =================================================
    // DISPLAY DELIVERY TIME
    // =================================================

    if (deliveryElement) {

        deliveryElement.textContent =
            deliveryTime;

    }


    // =================================================
    // DISPLAY ADDRESS
    // =================================================

    if (addressElement) {

        addressElement.textContent =
            address;

    }


    // =================================================
    // DISPLAY PAYMENT METHOD
    // =================================================

    if (paymentElement) {

        paymentElement.textContent =
            paymentMethod;

    }


    // =================================================
    // DISPLAY AMOUNT PAID
    // =================================================

    if (amountElement) {

        amountElement.textContent =
            formatMoney(amountPaid);

    }


    // =================================================
    // PREVIOUS BUTTON
    // =================================================

    if (previousBtn) {

        previousBtn.addEventListener(
            "click",
            function () {

                window.history.back();

            }
        );

    }


    // =================================================
    // NEXT BUTTON
    // =================================================

    if (nextBtn) {

        nextBtn.addEventListener(
            "click",
            function () {

                window.location.href =
                    "Chefcooking.html";

            }
        );

    }


    // =================================================
    // BUTTON PRESS EFFECT
    // =================================================

    const buttons =
        document.querySelectorAll(
            "button"
        );


    buttons.forEach(function (button) {

        button.addEventListener(
            "mousedown",
            function () {

                button.style.transform =
                    "scale(0.97)";

            }
        );


        button.addEventListener(
            "mouseup",
            function () {

                button.style.transform =
                    "";

            }
        );


        button.addEventListener(
            "mouseleave",
            function () {

                button.style.transform =
                    "";

            }
        );

    });

});