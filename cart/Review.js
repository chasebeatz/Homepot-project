/* =========================================================
   HOMEPOT - REVIEW ORDER
   CONNECTED TO THE SAME CART AS YOUR CART PAGE
========================================================= */


/* =========================================================
   SETTINGS
========================================================= */

const DELIVERY_FEE = 500;

const FREE_DELIVERY_LIMIT = 10000;

const SERVICE_FEE = 200;


/* =========================================================
   GET CART
========================================================= */

function getCart() {

    return JSON.parse(
        localStorage.getItem("homepotCart")
    ) || [];

}


/* =========================================================
   FORMAT MONEY
========================================================= */

function formatMoney(amount) {

    return `₦${Number(amount).toLocaleString()}`;

}


/* =========================================================
   GET ITEM IMAGE
========================================================= */

function getItemImage(item) {

    /*
       Your Cart saves the picture exactly as:

       image: image

       So we use item.image directly.
    */

    if (item.image) {

        return item.image;

    }

    return "";

}


/* =========================================================
   DISPLAY CART COUNT
========================================================= */

function updateReviewCartCount(cart) {

    const cartCount =
        document.getElementById("cartCount");

    if (!cartCount) {
        return;
    }


    let count = 0;


    cart.forEach(function(item) {

        count += Number(item.quantity) || 0;

    });


    cartCount.textContent = count;

}


/* =========================================================
   DISPLAY ITEMS
========================================================= */

function displayReviewItems(cart) {

    const container =
        document.getElementById("reviewItems");


    if (!container) {
        return;
    }


    container.innerHTML = "";


    /* EMPTY CART */

    if (cart.length === 0) {

        container.innerHTML = `
            <div class="empty-cart-message">
                Your cart is empty.
            </div>
        `;

        return;

    }


    /* CREATE EACH FOOD */

    cart.forEach(function(item) {

        const name =
            item.name || "Food Item";


        const price =
            Number(item.price) || 0;


        const quantity =
            Number(item.quantity) || 1;


        const image =
            getItemImage(item);


        const itemTotal =
            price * quantity;


        const reviewItem =
            document.createElement("div");


        reviewItem.className =
            "review-item";


        /* =================================================
           IMAGE
        ================================================= */

        let imageHTML;


        if (image) {

            imageHTML = `
                <img
                    src="${image}"
                    class="review-item-image"
                    alt="${item.name}"
                >
            `;

        } else {

            imageHTML = `
                <div class="review-item-image no-image">
                    <i class="fa-solid fa-utensils"></i>
                </div>
            `;

        }


        /* =================================================
           ITEM HTML
        ================================================= */

        reviewItem.innerHTML = `

            <div class="review-item-left">

                ${imageHTML}

                <div class="review-item-info">

                    <div class="review-item-name">
                        ${name}
                    </div>

                    <div class="review-item-quantity">
                        ${quantity} × ${formatMoney(price)}
                    </div>

                </div>

            </div>


            <div class="review-item-price">
                ${formatMoney(itemTotal)}
            </div>

        `;


        container.appendChild(reviewItem);

    });

}


/* =========================================================
   CALCULATE PRICE
========================================================= */

function updateReviewTotals(cart) {

    let subtotal = 0;


    /* CALCULATE SUBTOTAL */

    cart.forEach(function(item) {

        const price =
            Number(item.price) || 0;


        const quantity =
            Number(item.quantity) || 0;


        subtotal +=
            price * quantity;

    });


    /* =====================================================
       DELIVERY

       SAME RULE AS YOUR CART:

       ₦10,000 and above = FREE
       Below ₦10,000 = ₦500
    ===================================================== */

    let deliveryFee;


    if (subtotal >= FREE_DELIVERY_LIMIT) {

        deliveryFee = 0;

    } else {

        deliveryFee =
            cart.length > 0
                ? DELIVERY_FEE
                : 0;

    }


    /* =====================================================
       SERVICE FEE
    ===================================================== */

    const serviceFee =
        cart.length > 0
            ? SERVICE_FEE
            : 0;


    /* =====================================================
       TOTAL
    ===================================================== */

    const total =
        subtotal +
        deliveryFee +
        serviceFee;


    /* =====================================================
       SHOW SUBTOTAL
    ===================================================== */

    const subtotalElement =
        document.getElementById("subtotal");


    if (subtotalElement) {

        subtotalElement.textContent =
            formatMoney(subtotal);

    }


    /* =====================================================
       SHOW DELIVERY
    ===================================================== */

    const deliveryElement =
        document.getElementById("deliveryFee");


    if (deliveryElement) {

        if (
            deliveryFee === 0 &&
            subtotal >= FREE_DELIVERY_LIMIT
        ) {

            deliveryElement.textContent =
                "FREE";

            deliveryElement.classList.add(
                "free-delivery"
            );

        } else {

            deliveryElement.textContent =
                formatMoney(deliveryFee);

            deliveryElement.classList.remove(
                "free-delivery"
            );

        }

    }


    /* =====================================================
       SHOW SERVICE FEE
    ===================================================== */

    const serviceElement =
        document.getElementById("serviceFee");


    if (serviceElement) {

        serviceElement.textContent =
            formatMoney(serviceFee);

    }


    /* =====================================================
       SHOW TOTAL
    ===================================================== */

    const totalElement =
        document.getElementById("total");


    if (totalElement) {

        totalElement.textContent =
            formatMoney(total);

    }


    /* =====================================================
       PAYMENT BUTTON
    ===================================================== */

    const paymentButton =
        document.getElementById("paymentBtn");


    if (paymentButton) {

        paymentButton.disabled =
            cart.length === 0;

    }


    return {

        subtotal: subtotal,

        deliveryFee: deliveryFee,

        serviceFee: serviceFee,

        total: total

    };

}


/* =========================================================
   LOAD ADDRESS
========================================================= */

function loadAddress() {

    const savedAddress =
        localStorage.getItem(
            "homepotDeliveryAddress"
        );


    const addressElement =
        document.getElementById(
            "deliveryAddress"
        );


    const headerLocation =
        document.getElementById(
            "headerLocation"
        );


    if (!savedAddress) {
        return;
    }


    if (addressElement) {

        addressElement.textContent =
            savedAddress;

    }


    if (headerLocation) {

        const parts =
            savedAddress.split(",");


        if (parts.length >= 2) {

            headerLocation.textContent =
                parts[parts.length - 2].trim();

        } else {

            headerLocation.textContent =
                savedAddress;

        }

    }

}


/* =========================================================
   OPEN ADDRESS
========================================================= */

function openAddressModal() {

    const modal =
        document.getElementById(
            "addressModal"
        );


    const input =
        document.getElementById(
            "newAddress"
        );


    const currentAddress =
        document.getElementById(
            "deliveryAddress"
        );


    if (!modal || !input) {
        return;
    }


    if (currentAddress) {

        input.value =
            currentAddress.textContent.trim();

    }


    modal.classList.add("active");

}


/* =========================================================
   CLOSE ADDRESS
========================================================= */

function closeAddressModal() {

    const modal =
        document.getElementById(
            "addressModal"
        );


    if (modal) {

        modal.classList.remove("active");

    }

}


/* =========================================================
   SAVE ADDRESS
========================================================= */

function saveAddress() {

    const input =
        document.getElementById(
            "newAddress"
        );


    if (!input) {
        return;
    }


    const address =
        input.value.trim();


    if (address === "") {

        alert(
            "Please enter your delivery address."
        );

        return;

    }


    localStorage.setItem(
        "homepotDeliveryAddress",
        address
    );


    loadAddress();

    closeAddressModal();

}


/* =========================================================
   PROCEED TO PAYMENT
========================================================= */

function proceedToPayment() {

    const cart =
        getCart();


    if (cart.length === 0) {

        alert(
            "Your cart is empty. Please add food before proceeding to payment."
        );

        return;

    }


    const prices =
        updateReviewTotals(cart);


    const address =
        localStorage.getItem(
            "homepotDeliveryAddress"
        ) ||
        document.getElementById(
            "deliveryAddress"
        ).textContent.trim();


    /* SAVE COMPLETE ORDER */

    const order = {

        items: cart,

        address: address,

        subtotal: prices.subtotal,

        deliveryFee: prices.deliveryFee,

        serviceFee: prices.serviceFee,

        total: prices.total,

        createdAt:
            new Date().toISOString()

    };


    localStorage.setItem(
        "homepotCurrentOrder",
        JSON.stringify(order)
    );


    /* GO TO PAYMENT */

    window.location.href =
        "Paymentmethod.html";

}


/* =========================================================
   LOAD REVIEW PAGE
========================================================= */

function loadReviewPage() {

    const cart =
        getCart();


    console.log(
        "HomePot Review Cart:",
        cart
    );


    updateReviewCartCount(cart);

    displayReviewItems(cart);

    updateReviewTotals(cart);

    loadAddress();

}


/* =========================================================
   START
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {


        loadReviewPage();


        /* CHANGE ADDRESS */

        const changeAddress =
            document.getElementById(
                "changeAddressBtn"
            );


        if (changeAddress) {

            changeAddress.addEventListener(
                "click",
                openAddressModal
            );

        }


        /* SAVE ADDRESS */

        const saveAddressButton =
            document.getElementById(
                "saveAddress"
            );


        if (saveAddressButton) {

            saveAddressButton.addEventListener(
                "click",
                saveAddress
            );

        }


        /* CANCEL */

        const cancelAddress =
            document.getElementById(
                "cancelAddress"
            );


        if (cancelAddress) {

            cancelAddress.addEventListener(
                "click",
                closeAddressModal
            );

        }


        /* CLOSE X */

        const closeAddress =
            document.getElementById(
                "closeAddressModal"
            );


        if (closeAddress) {

            closeAddress.addEventListener(
                "click",
                closeAddressModal
            );

        }


        /* PAYMENT */

        const paymentButton =
            document.getElementById(
                "paymentBtn"
            );


        if (paymentButton) {

            paymentButton.addEventListener(
                "click",
                proceedToPayment
            );

        }


        /* CLICK OUTSIDE MODAL */

        const modal =
            document.getElementById(
                "addressModal"
            );


        if (modal) {

            modal.addEventListener(
                "click",
                function(event) {

                    if (
                        event.target === modal
                    ) {

                        closeAddressModal();

                    }

                }
            );

        }

    }
);


/* =========================================================
   KEEP REVIEW SYNCHRONIZED
========================================================= */

setInterval(function() {

    const cart =
        getCart();


    updateReviewCartCount(cart);

    displayReviewItems(cart);

    updateReviewTotals(cart);

}, 500);