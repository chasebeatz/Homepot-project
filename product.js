/* =========================================================
   HOMEPOT CART SYSTEM
========================================================= */


/* =========================================================
   GET CART
========================================================= */

function getCart() {

    return JSON.parse(
        localStorage.getItem("homepotCart")
    ) || [];

}


/* =========================================================
   SAVE CART
========================================================= */

function saveCart(cart) {

    localStorage.setItem(
        "homepotCart",
        JSON.stringify(cart)
    );

}


/* =========================================================
   FORMAT MONEY
========================================================= */

function formatMoney(amount) {

    return "₦" + Number(amount).toLocaleString();

}


/* =========================================================
   PRODUCT PAGE
========================================================= */

const addButton =
    document.getElementById(
        "product-add-button"
    );


if (addButton) {


    /* =====================================================
       QUANTITY BUTTONS
    ===================================================== */

    const plusButton =
        document.getElementById("plus");


    const minusButton =
        document.getElementById("minus");


    const quantityDisplay =
        document.getElementById("quantity");


    let quantity = 1;


    /* PLUS */

    if (plusButton) {

        plusButton.addEventListener(
            "click",
            function () {

                quantity++;

                quantityDisplay.textContent =
                    quantity;

            }
        );

    }


    /* MINUS */

    if (minusButton) {

        minusButton.addEventListener(
            "click",
            function () {

                if (quantity > 1) {

                    quantity--;

                    quantityDisplay.textContent =
                        quantity;

                }

            }
        );

    }


    /* =====================================================
       ADD TO CART BUTTON
    ===================================================== */

    addButton.addEventListener(
        "click",
        function () {


            /* GET PRODUCT NAME */

            const name =
                document
                    .getElementById(
                        "product-title"
                    )
                    .textContent
                    .trim();


            /* GET PRODUCT PRICE */

            const priceText =
                document
                    .getElementById(
                        "product-price"
                    )
                    .textContent
                    .trim();


            const price =
                Number(
                    priceText.replace(
                        /[₦,]/g,
                        ""
                    )
                );


            /* GET PRODUCT IMAGE */

            const imageElement =
                document.getElementById(
                    "product-image"
                );


            const image =
                new URL(
                    imageElement.getAttribute(
                        "src"
                    ),
                    document.baseURI
                ).href;


            /* CREATE PRODUCT ID */

            const id =
                name
                    .toLowerCase()
                    .replace(
                        /[^a-z0-9]+/g,
                        "-"
                    )
                    .replace(
                        /^-|-$/g,
                        "");


            /* CREATE CART PRODUCT */

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


            /* IF IT EXISTS, ADD QUANTITY */

            if (existingProduct) {

                existingProduct.quantity +=
                    quantity;

            }


            /* OTHERWISE ADD NEW PRODUCT */

            else {

                cart.push(product);

            }


            /* SAVE CART */

            saveCart(cart);


            /* UPDATE HEADER COUNT */

            updateCartCount();


            /* GO TO YOUR CART */

            window.location.href =
                "cart/Yourcart.html";

        }
    );

}


/* =========================================================
   DISPLAY CART
========================================================= */

function displayCart() {


    const cartContainer =
        document.getElementById(
            "cart-items"
        );


    /*
       If #cart-items does not exist,
       this is not the cart page.
    */

    if (!cartContainer) {

        return;

    }


    const cart =
        getCart();


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
       DISPLAY EVERY PRODUCT
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
                    src="${item.image}"
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
   CHANGE QUANTITY IN CART
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


    /* REMOVE IF ZERO */

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
   REMOVE PRODUCT
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
   UPDATE ORDER SUMMARY
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


    /* DELIVERY */

    let deliveryFee = 500;


    if (subtotal >= 10000) {

        deliveryFee = 0;

    }


    /* SERVICE FEE */

    const serviceFee = 200;


    /* TOTAL */

    const total =
        subtotal +
        deliveryFee +
        serviceFee;


    /* SUBTOTAL */

    const subtotalElement =
        document.getElementById(
            "subtotal"
        );


    if (subtotalElement) {

        subtotalElement.textContent =
            formatMoney(subtotal);

    }


    /* DELIVERY */

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


    /* SERVICE */

    const serviceElement =
        document.getElementById(
            "service-fee"
        );


    if (serviceElement) {

        serviceElement.textContent =
            formatMoney(serviceFee);

    }


    /* TOTAL */

    const totalElement =
        document.getElementById(
            "total"
        );


    if (totalElement) {

        totalElement.textContent =
            formatMoney(total);

    }


    /* FREE DELIVERY MESSAGE */

    const freeDelivery =
        document.getElementById(
            "free-delivery"
        );


    if (freeDelivery) {

        if (subtotal >= 10000) {

            freeDelivery.textContent =
                "✓ You qualify for free delivery";

        }

        else if (subtotal === 0) {

            freeDelivery.textContent =
                "✓ Free delivery on orders above ₦10,000";

        }

        else {

            const remaining =
                10000 - subtotal;


            freeDelivery.textContent =
                "Add " +
                formatMoney(remaining) +
                " more for free delivery";

        }

    }

}


/* =========================================================
   UPDATE HEADER CART COUNT
========================================================= */

function updateCartCount() {


    const cart =
        getCart();


    let count = 0;


    cart.forEach(
        function (item) {

            count +=
                Number(item.quantity);

        }
    );


    /*
       IMPORTANT:

       Your product HTML uses:

       class="cart-count"

       not:

       id="cart-count"
    */


    const cartCounts =
        document.querySelectorAll(
            ".cart-count"
        );


    cartCounts.forEach(
        function (element) {

            element.textContent =
                count;

        }
    );

}


/* =========================================================
   PROMO CODE
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


            const code =
                promoInput.value
                    .trim()
                    .toUpperCase();


            if (code === "") {

                alert(
                    "Please enter a promo code."
                );

                return;

            }


            /*
               SAMPLE PROMO CODE

               HOME10

               This is only an example.

               Later you can replace this
               with your real promo-code system.
            */

            if (code === "HOME10") {

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
   REVIEW ORDER
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


            /*
               DO NOT CONTINUE IF CART IS EMPTY
            */

            if (cart.length === 0) {

                alert(
                    "Your cart is empty. Please add food before reviewing your order."
                );

                return;

            }


            /*
               SAVE THE CURRENT CART
               BEFORE GOING TO REVIEW
            */

            saveCart(cart);


            /*
               GO TO REVIEW PAGE
            */

            window.location.href =
                "review.html";

        }
    );

}


/* =========================================================
   HEADER CART CLICK
========================================================= */

const headerCart =
    document.querySelector(
        ".header-right"
    );


if (headerCart) {


    const cartPart =
        headerCart.querySelector(
            ".cart-count"
        );


    if (cartPart) {


        const cartClickable =
            cartPart.parentElement;


        cartClickable.style.cursor =
            "pointer";


        cartClickable.addEventListener(
            "click",
            function () {


                /*
                   PRODUCT PAGE:

                   cart/Yourcart.html
                */

                if (
                    !window.location.pathname.includes(
                        "/cart/"
                    )
                ) {

                    window.location.href =
                        "cart/Yourcart.html";

                }

                /*
                   CART FOLDER:

                   Yourcart.html
                */

                else {

                    window.location.href =
                        "Yourcart.html";

                }

            }
        );

    }

}


/* =========================================================
   START CART SYSTEM
========================================================= */

/*
   These three functions start the system.
*/


displayCart();

updateTotals();

updateCartCount();