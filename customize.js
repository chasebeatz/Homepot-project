(function () {
  let addButton = document.querySelector("#customize-add-button");
  let totalElement = document.querySelector("#customize-total");

  if (!addButton || !totalElement) {
    return;
  }

  function getOrder() {
    let params = new URLSearchParams(window.location.search);
    let itemName = params.get("item") || "Banga Soup & Starch";
    let product = getProduct(itemName);
    let urlPrice = Number(String(params.get("price") || "").replace(/[₦,]/g, ""));
    let basePrice = urlPrice || Number(String(product.price).replace(/[₦,]/g, ""));
    let quantity = Math.max(1, Number(params.get("quantity")) || 1);
    let selectedProtein = document.querySelector('input[name="protein"]:checked');
    let protein = selectedProtein
      ? selectedProtein.parentElement.textContent.replace(/Included/g, "").trim()
      : "Chef's choice";
    let addons = [];
    let addonsTotal = 0;

    document.querySelectorAll("input[data-addon]:checked").forEach(function (input) {
      addons.push(input.dataset.addon);
      addonsTotal += Number(input.dataset.price) || 0;
    });

    return {
      itemName: itemName,
      product: product,
      quantity: quantity,
      protein: protein,
      addons: addons,
      notes: (document.querySelector(".customize-grid textarea") || {}).value || "",
      total: basePrice * quantity + addonsTotal
    };
  }

  function updateTotal() {
    let order = getOrder();

    totalElement.textContent = formatMoney(order.total);
    addButton.textContent = "Save & Add to Cart · " + formatMoney(order.total);

    document.querySelectorAll(".option").forEach(function (option) {
      let input = option.querySelector("input");
      option.classList.toggle("selected", Boolean(input && input.checked));
    });
  }

  function addCustomizedOrder() {
    let order = getOrder();
    let choices = [order.protein].concat(order.addons);
    let customName = order.itemName + " · " + choices.join(", ");
    let itemId = customName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    let existingItem = cartItems.find(function (item) {
      return item.id === itemId;
    });
    let unitPrice = order.total / order.quantity;

    if (existingItem) {
      existingItem.quantity += order.quantity;
    } else {
      cartItems.push({
        id: itemId,
        name: customName,
        price: unitPrice,
        image: new URL(order.product.image, document.baseURI).href,
        quantity: order.quantity,
        notes: order.notes
      });
    }

    updateCart();
    openCart();
  }

  document
    .querySelectorAll('.customize-grid input[type="radio"], .customize-grid input[type="checkbox"]')
    .forEach(function (input) {
      input.addEventListener("change", updateTotal);
    });

  addButton.addEventListener("click", addCustomizedOrder);
  updateTotal();
})();
