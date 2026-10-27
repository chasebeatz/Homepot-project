document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // GET THE SAVED ORDER
    // ==========================================

    function readStorage(key, fallback) {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : fallback;
        } catch (error) {
            return fallback;
        }
    }

    const order = readStorage("homepotCurrentOrder", {});

    let items = Array.isArray(order.items) ? order.items : [];

    // Use the saved cart if the order has no items
    if (items.length === 0) {
        items = readStorage("homepotCart", []);
    }

    // ==========================================
    // FORMAT MONEY
    // ==========================================

    function formatMoney(amount) {
        const price = Number(
            String(amount ?? 0).replace(/[₦,\s]/g, "")
        ) || 0;

        return "₦" + price.toLocaleString("en-NG");
    }

    // ==========================================
    // ORDER NUMBER
    // ==========================================

    const orderNumberElement =
        document.getElementById("orderNumber");

    if (orderNumberElement) {
        orderNumberElement.textContent =
            order.orderNumber || "Unavailable";
    }

    // ==========================================
    // SELECTED CHEF
    // ==========================================

    let selectedChef = readStorage(
        "homepotSelectedChef",
        null
    );

    // Support a chef saved as ordinary text
    if (typeof selectedChef !== "string") {
        selectedChef =
            selectedChef?.name ||
            selectedChef?.chefName ||
            "";
    }

    const chefName =
        order.chefName ||
        (typeof order.chef === "string" ? order.chef : "") ||
        selectedChef ||
        "Your selected chef";

    const chefNameElement =
        document.getElementById("chefName");

    if (chefNameElement) {
        chefNameElement.textContent = chefName;
    }

    // ==========================================
    // DISPLAY FOOD ITEMS
    // ==========================================

    const orderItemsContainer =
        document.getElementById("orderItems");

    if (orderItemsContainer) {

        orderItemsContainer.replaceChildren();

        if (items.length === 0) {

            orderItemsContainer.textContent =
                "No food items were found for this order.";

        } else {

            items.forEach(function (item) {

                const name =
                    item.name || item.title || "Food item";

                const quantity =
                    Math.max(1, Number(item.quantity) || 1);

                const unitPrice =
                    Number(
                        String(item.price ?? 0)
                            .replace(/[₦,\s]/g, "")
                    ) || 0;

                const row =
                    document.createElement("div");

                row.className = "item";

                const itemName =
                    document.createElement("span");

                itemName.textContent =
                    `${name} × ${quantity}`;

                const itemPrice =
                    document.createElement("strong");

                itemPrice.textContent =
                    formatMoney(unitPrice * quantity);

                row.append(itemName, itemPrice);

                orderItemsContainer.appendChild(row);

            });

        }
    }

    // ==========================================
    // DELIVERY ADDRESS
    // ==========================================

    const deliveryAddressElement =
        document.getElementById("deliveryAddress");

    let address =
        order.address ||
        localStorage.getItem("homepotDeliveryAddress") ||
        "";

    // Support an address saved as an object
    if (typeof address === "object" && address !== null) {
        address =
            address.fullAddress ||
            address.address ||
            address.formattedAddress ||
            [
                address.street,
                address.city,
                address.state
            ].filter(Boolean).join(", ");
    }

    if (deliveryAddressElement) {
        deliveryAddressElement.textContent =
            address || "Delivery address not available";
    }

    // ==========================================
    // ESTIMATED DELIVERY
    // ==========================================

    const deliveryEstimateElement =
        document.getElementById("deliveryEstimate");

    if (deliveryEstimateElement) {
        deliveryEstimateElement.textContent =
            order.deliveryTime ||
            order.estimatedArrival ||
            "Estimate not available";
    }

    // ==========================================
    // ORDER PROGRESS ELEMENTS
    // ==========================================

    const confirmedStep =
        document.getElementById("confirmedStep");

    const preparingStep =
        document.getElementById("preparingStep");

    const readyStep =
        document.getElementById("readyStep");

    const deliveringStep =
        document.getElementById("deliveringStep");

    const deliveredStep =
        document.getElementById("deliveredStep");

    const line1 = document.getElementById("line1");
    const line2 = document.getElementById("line2");
    const line3 = document.getElementById("line3");
    const line4 = document.getElementById("line4");

    const statusTitle =
        document.getElementById("statusTitle");

    const statusMessage =
        document.getElementById("statusMessage");

    const timeText =
        document.getElementById("timeText");

    const timeLabel =
        document.getElementById("timeLabel");

    // ==========================================
    // RESET PROGRESS
    // ==========================================

    function resetProgress() {

        [
            confirmedStep,
            preparingStep,
            readyStep,
            deliveringStep,
            deliveredStep
        ].forEach(function (step) {

            if (step) {
                step.classList.remove(
                    "completed",
                    "current-step"
                );
            }

        });

        [line1, line2, line3, line4].forEach(
            function (line) {

                if (line) {
                    line.classList.remove("completed-line");
                }

            }
        );
    }

    function activateStep(step) {
        if (step) {
            step.classList.add("current-step");
        }
    }

    function completeStep(step) {
        if (step) {
            step.classList.add("completed");
        }
    }

    function completeLine(line) {
        if (line) {
            line.classList.add("completed-line");
        }
    }

    // Build a readable list of ordered food
    const foodNames = items.map(function (item) {
        const quantity = Math.max(
            1,
            Number(item.quantity) || 1
        );

        return `${item.name || item.title || "Food item"} × ${quantity}`;
    });

    const foodDescription = foodNames.length
        ? foodNames.join(", ")
        : "your selected food";

    // ==========================================
    // CONFIRMED STATUS
    // ==========================================

    function showConfirmed() {

        resetProgress();
        activateStep(confirmedStep);

        if (statusTitle) {
            statusTitle.innerHTML =
                "Your Order is<br>Confirmed!";
        }

        if (statusMessage) {
            statusMessage.textContent =
                `Your order has been confirmed. ${chefName} will start preparing ${foodDescription} shortly.`;
        }

        if (timeText) {
            timeText.textContent = "~45 min";
        }

        if (timeLabel) {
            timeLabel.textContent = "Estimated prep time";
        }
    }

    // ==========================================
    // PREPARING STATUS
    // ==========================================

    function showPreparing() {

        resetProgress();

        completeStep(confirmedStep);
        activateStep(preparingStep);
        completeLine(line1);

        if (statusTitle) {
            statusTitle.textContent =
                `${chefName} is Cooking!`;
        }

        if (statusMessage) {
            statusMessage.textContent =
                `${chefName} is preparing ${foodDescription}.`;
        }

        if (timeText) {
            timeText.textContent = "~45 min";
        }

        if (timeLabel) {
            timeLabel.textContent = "Estimated prep time";
        }
    }

    // ==========================================
    // READY STATUS
    // ==========================================

    function showReady() {

        resetProgress();

        completeStep(confirmedStep);
        completeStep(preparingStep);
        activateStep(readyStep);

        completeLine(line1);
        completeLine(line2);

        if (statusTitle) {
            statusTitle.innerHTML =
                "Your Order is<br>Ready!";
        }

        if (statusMessage) {
            statusMessage.textContent =
                `${chefName} has finished preparing your order. Your food is ready for delivery.`;
        }

        if (timeText) {
            timeText.textContent = "Ready!";
        }

        if (timeLabel) {
            timeLabel.textContent = "Your food is ready";
        }
    }

    // ==========================================
    // CALL SELECTED CHEF
    // ==========================================

    const callChefBtn =
        document.getElementById("callChefBtn");

    if (callChefBtn) {

        callChefBtn.addEventListener("click", function () {

            let phone =
                order.chefPhone ||
                localStorage.getItem("homepotSelectedChefPhone");

            if (!phone) {
                alert(
                    `The phone number for ${chefName} is not available yet.`
                );
                return;
            }

            phone = String(phone).replace(/[^\d+]/g, "");

            if (confirm(`Do you want to call ${chefName}?`)) {
                window.location.href = "tel:" + phone;
            }

        });
    }

    // ==========================================
    // NEED HELP
    // ==========================================

    const helpBtn =
        document.getElementById("helpBtn");

    if (helpBtn) {

        helpBtn.addEventListener("click", function (event) {

            event.preventDefault();

            alert(
                "Need help with your order?\n\n" +
                "Please contact HomePot customer support."
            );

        });
    }

    // ==========================================
    // START ORDER FLOW
    // ==========================================

    showConfirmed();

    // Confirmed → Preparing
    setTimeout(function () {
        showPreparing();
    }, 3000);

    // Preparing → Ready
    setTimeout(function () {
        showReady();
    }, 8000);

    // Ready → Delivery page
    setTimeout(function () {
        window.location.href = "../Delivery/Ready.html";
    }, 10000);

});