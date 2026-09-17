/* =========================================================
   HOMEPOT - ONE COMPLETE JAVASCRIPT FILE
========================================================= */


/* =========================================================
   1. GET CART
========================================================= */

function getCart() {

    return JSON.parse(
        localStorage.getItem("homepotCart")
    ) || [];

}


/* =========================================================
   2. SAVE CART
========================================================= */

function saveCart(cart) {

    localStorage.setItem(
        "homepotCart",
        JSON.stringify(cart)
    );

}


/* =========================================================
   3. FORMAT MONEY
========================================================= */

function formatMoney(amount) {

    return `₦${Number(amount).toLocaleString()}`;

}


/* =========================================================
   4. PRODUCT PAGE - QUANTITY
========================================================= */

const plusButton =
    document.getElementById("plus");

const minusButton =
    document.getElementById("minus");

const quantityDisplay =
    document.getElementById("quantity");


if (plusButton && quantityDisplay) {

    plusButton.addEventListener(
        "click",
        function () {

            let quantity =
                Number(quantityDisplay.textContent);

            quantity++;

            quantityDisplay.textContent =
                quantity;

        }
    );

}


if (minusButton && quantityDisplay) {

    minusButton.addEventListener(
        "click",
        function () {

            let quantity =
                Number(quantityDisplay.textContent);

            if (quantity > 1) {

                quantity--;

                quantityDisplay.textContent =
                    quantity;

            }

        }
    );

}


/* =========================================================
   5. PRODUCT PAGE - ADD TO CART
========================================================= */

const addButton =
    document.getElementById(
        "product-add-button"
    );


if (addButton) {

    addButton.addEventListener(
        "click",
        function () {

            const titleElement =
                document.getElementById(
                    "product-title"
                );


            const priceElement =
                document.getElementById(
                    "product-price"
                );


            const imageElement =
                document.getElementById(
                    "product-image"
                );


            if (
                !titleElement ||
                !priceElement ||
                !imageElement
            ) {

                alert(
                    "Product information is missing."
                );

                return;

            }


            /* FOOD NAME */

            const name =
                titleElement.textContent.trim();


            /* FOOD PRICE */

            const price =
                Number(
                    priceElement.textContent
                        .replace(/[₦,]/g, "")
                        .trim()
                );


            /* FOOD IMAGE */

            const image =
                new URL(
                    imageElement.getAttribute("src"),
                    document.baseURI
                ).href;


            /* QUANTITY */

            const quantity =
                quantityDisplay
                    ? Number(
                        quantityDisplay.textContent
                    )
                    : 1;


            /* PRODUCT ID */

            const id =
                name
                    .toLowerCase()
                    .replace(
                        /[^a-z0-9]+/g,
                        "-"
                    )
                    .replace(
                        /^-|-$/g,
                        ""
                    );


            /* CREATE PRODUCT */

            const product = {

                id: id,

                name: name,

                price: price,

                image: image,

                quantity: quantity

            };


            /* GET EXISTING CART */

            let cart =
                getCart();


            /* CHECK IF PRODUCT ALREADY EXISTS */

            const existingProduct =
                cart.find(
                    function (item) {

                        return item.id === id;

                    }
                );


            if (existingProduct) {

                existingProduct.quantity +=
                    quantity;

            } else {

                cart.push(product);

            }


            /* SAVE */

            saveCart(cart);


            /* UPDATE COUNT */

            updateCartCount();


            /* GO TO CART */

            window.location.href =
                "cart/Yourcart.html";

        }
    );

}


/* =========================================================
   6. DISPLAY CART ITEMS
========================================================= */

function displayCart() {

    const cartContainer =
        document.getElementById(
            "cart-items"
        );


    /* Not the cart page */

    if (!cartContainer) {

        return;

    }


    const cart =
        getCart();


    /* CLEAR CART */

    cartContainer.innerHTML = "";


    /* =====================================================
       EMPTY CART
    ===================================================== */

    if (cart.length === 0) {

        cartContainer.innerHTML = `

            <div class="empty-cart">

                <h2>
                    Your cart is empty
                </h2>

                <p>
                    Add some food to your cart.
                </p>

            </div>

        `;


        updateTotals();

        updateCartCount();

        return;

    }


    /* =====================================================
       CREATE EVERY FOOD ITEM
    ===================================================== */

    cart.forEach(
        function (item) {

            const itemTotal =
                Number(item.price) *
                Number(item.quantity);


            const cartItem =
                document.createElement(
                    "div"
                );


            cartItem.className =
                "cart-item";


            cartItem.innerHTML = `

                <img
                    class="cart-item-image"
                    src="../${item.image}"
                    alt="${item.name}"
                >


                <div class="cart-item-info">

                    <h3 class="cart-item-name">
                        ${item.name}
                    </h3>


                    <div class="cart-item-price">
                        ${formatMoney(itemTotal)}
                    </div>


                    <div class="cart-quantity">

                        <button
                            type="button"
                            onclick="changeQuantity('${item.id}', -1)"
                        >
                            −
                        </button>


                        <span>
                            ${item.quantity}
                        </span>


                        <button
                            type="button"
                            onclick="changeQuantity('${item.id}', 1)"
                        >
                            +
                        </button>

                    </div>

                </div>


                <button
                    type="button"
                    class="remove-item"
                    onclick="removeItem('${item.id}')"
                >
                    ×
                </button>

            `;


            cartContainer.appendChild(
                cartItem
            );

        }
    );


    updateTotals();

    updateCartCount();

}


/* =========================================================
   7. CHANGE CART QUANTITY
========================================================= */

function changeQuantity(
    productId,
    amount
) {

    let cart =
        getCart();


    const product =
        cart.find(
            function (item) {

                return item.id === productId;

            }
        );


    if (!product) {

        return;

    }


    product.quantity +=
        amount;


    /* Remove when quantity reaches zero */

    if (product.quantity <= 0) {

        cart =
            cart.filter(
                function (item) {

                    return item.id !== productId;

                }
            );

    }


    saveCart(cart);

    displayCart();

    updateCartCount();

}


/* =========================================================
   8. REMOVE ITEM
========================================================= */

function removeItem(productId) {

    let cart =
        getCart();


    cart =
        cart.filter(
            function (item) {

                return item.id !== productId;

            }
        );


    saveCart(cart);

    displayCart();

    updateCartCount();

}


/* =========================================================
   9. UPDATE ORDER SUMMARY
========================================================= */

function updateTotals() {

    const cart =
        getCart();


    let subtotal = 0;


    /* CALCULATE SUBTOTAL */

    cart.forEach(
        function (item) {

            subtotal +=
                Number(item.price) *
                Number(item.quantity);

        }
    );


    /* =====================================================
       DELIVERY FEE
    ===================================================== */

    let deliveryFee = 500;


    /*
       ₦10,000 and above =
       FREE DELIVERY
    */

    if (subtotal >= 10000) {

        deliveryFee = 0;

    }


    /* =====================================================
       SERVICE FEE
    ===================================================== */

    const serviceFee = 200;


    /* =====================================================
       FINAL TOTAL
    ===================================================== */

    const total =
        subtotal +
        deliveryFee +
        serviceFee;


    /* =====================================================
       SUBTOTAL
    ===================================================== */

    const subtotalElement =
        document.getElementById(
            "subtotal"
        );


    if (subtotalElement) {

        subtotalElement.textContent =
            formatMoney(subtotal);

    }


    /* =====================================================
       DELIVERY
    ===================================================== */

    const deliveryElement =
        document.getElementById(
            "delivery-fee"
        );


    if (deliveryElement) {

        deliveryElement.textContent =
            deliveryFee === 0
                ? "FREE"
                : formatMoney(deliveryFee);

    }


    /* =====================================================
       SERVICE
    ===================================================== */

    const serviceElement =
        document.getElementById(
            "service-fee"
        );


    if (serviceElement) {

        serviceElement.textContent =
            formatMoney(serviceFee);

    }


    /* =====================================================
       TOTAL
    ===================================================== */

    const totalElement =
        document.getElementById(
            "total"
        );


    if (totalElement) {

        totalElement.textContent =
            formatMoney(total);

    }


    /* =====================================================
       FREE DELIVERY MESSAGE
    ===================================================== */

    const deliveryMessage =
        document.getElementById(
            "free-delivery"
        );


    if (deliveryMessage) {

        if (subtotal >= 10000) {

            deliveryMessage.textContent =
                "✓ You qualify for free delivery";

        }

        else if (subtotal === 0) {

            deliveryMessage.textContent =
                "✓ Free delivery on orders above ₦10,000";

        }

        else {

            const remaining =
                10000 - subtotal;


            deliveryMessage.textContent =
                `Add ${formatMoney(remaining)} more for free delivery`;

        }

    }

}


/* =========================================================
   10. UPDATE HEADER CART COUNT
========================================================= */

function updateCartCount() {

    const cart =
        getCart();


    let count = 0;


    /* Add all quantities together */

    cart.forEach(
        function (item) {

            count +=
                Number(item.quantity);

        }
    );


    const cartCount =
        document.getElementById(
            "cart-count"
        );


    if (cartCount) {

        cartCount.textContent =
            count;

    }

}


/* =========================================================
   11. PROMO CODE
========================================================= */

const promoButton =
    document.getElementById(
        "apply-promo"
    );


if (promoButton) {

    promoButton.addEventListener(
        "click",
        function () {

            const promoInput =
                document.getElementById(
                    "promo-code"
                );


            if (!promoInput) {

                return;

            }


            const promoCode =
                promoInput.value
                    .trim()
                    .toUpperCase();


            /* EMPTY PROMO CODE */

            if (promoCode === "") {

                alert(
                    "Please enter a promo code."
                );

                return;

            }


            /* =================================================
               PROMO CODE

               CURRENT EXAMPLE:

               HOME10
            ================================================= */

            if (promoCode === "HOME10") {

                alert(
                    "Promo code applied successfully!"
                );

            }

            else {

                alert(
                    "Invalid promo code."
                );

            }

        }
    );

}


/* =========================================================
   12. REVIEW ORDER
========================================================= */

const reviewButton =
    document.getElementById(
        "review-order"
    );


if (reviewButton) {

    reviewButton.addEventListener(
        "click",
        function () {

            const cart =
                getCart();


            /* =================================================
               DO NOT CONTINUE IF CART IS EMPTY
            ================================================= */

            if (cart.length === 0) {

                alert(
                    "Your cart is empty. Please add food before reviewing your order."
                );

                return;

            }


            /* =================================================
               SAVE CART BEFORE REVIEW
            ================================================= */

            saveCart(cart);


            /* =================================================
               GO TO REVIEW PAGE
            ================================================= */

            window.location.href =
                "review.html";

        }
    );

}


/* =========================================================
   13. HEADER CART CLICK
========================================================= */

const headerCart =
    document.querySelector(
        ".header-cart"
    );


if (headerCart) {

    headerCart.addEventListener(
        "click",
        function () {

            /*
               If we are already inside
               the cart folder:
            */

            if (
                window.location.pathname.includes(
                    "/cart/"
                )
            ) {

                window.location.href =
                    "Yourcart.html";

            }

            /*
               If we are on a product page
               in the main HomePot folder:
            */

            else {

                window.location.href =
                    "cart/Yourcart.html";

            }

        }
    );

}


/* =========================================================
   14. START CART SYSTEM
========================================================= */

/*
   When the page loads:

   displayCart()
   → shows all foods

   updateTotals()
   → calculates all prices

   updateCartCount()
   → updates the header cart number
*/


displayCart();

updateTotals();

updateCartCount();

