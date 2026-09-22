let cart = 0;
let cartItems = getCart();

function getCart() {
  try {
    let savedCart = JSON.parse(localStorage.getItem("homepotCart"));
    if (!Array.isArray(savedCart)) return [];

    return savedCart.map(function (item) {
      let itemName = item.name || "Chef's Special";
      return {
        id: item.id || itemName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
        name: itemName,
        price: Number(String(item.price || 0).replace(/[₦,]/g, "")),
        image: item.image || "",
        quantity: Math.max(1, Number(item.quantity) || 1)
      };
    });
  } catch (error) {
    return [];
  }
}

function saveCart(items) {
  try {
    localStorage.setItem("homepotCart", JSON.stringify(items));
  } catch (error) {
    // The cart still works for the current page when browser storage is unavailable.
  }
}

function formatMoney(amount) {
  return "₦" + Number(amount || 0).toLocaleString();
}
let cartNumbers = document.querySelectorAll("#cart-count, .cart-count");
let searchInput = document.querySelector("#search");
let pageSearch = document.querySelectorAll(".page-search");
let heroForm = document.querySelector("#hero-form");
let heroSearch = document.querySelector("#hero-search");
let cards = document.querySelectorAll(".searchable");
let noResults = document.querySelector("#no-results");
let categoryButtons = document.querySelectorAll(".category");
let addButtons = document.querySelectorAll(".add, .add-product");
let plusButton = document.querySelector("#plus");
let minusButton = document.querySelector("#minus");
let quantity = document.querySelector("#quantity");
let newsletterForm = document.querySelector("#newsletter-form");
let email = document.querySelector("#email");
let newsletterMessage = document.querySelector("#newsletter-message");
let resultsSearch = document.querySelector("#results-search");
let resultsText = document.querySelector("#results-text");
let toast = document.querySelector("#toast");
let timer;
let productLinks = document.querySelectorAll('a[href="product.html"]');
let productImage = document.querySelector("#product-image");
let productTitle = document.querySelector("#product-title");
let productPrice = document.querySelector("#product-price");
let productRating = document.querySelector("#product-rating");
let productDescription = document.querySelector("#product-description");
let productBreadcrumb = document.querySelector("#product-breadcrumb");
let productIncludes = document.querySelector("#product-includes");
let productAddButton = document.querySelector("#product-add-button");
let customizeLink = document.querySelector("#customize-link");
let customizeItem = document.querySelector("#customize-item");
let customizeAddButton = document.querySelector("#customize-add-button");
let categoryPageTitle = document.querySelector("#category-title");
let categoryPageEmoji = document.querySelector("#category-emoji");
let categoryPageDescription = document.querySelector("#category-description");
let categoryPageSubtitle = document.querySelector("#category-subtitle");
let categoryPageDishes = document.querySelector("#category-dishes");
let menuToggle = document.querySelector(".menu-toggle");
let pageNav = document.querySelector(".page-nav");
let cartItemsBox = document.querySelector("#cart-items");

let products = {
  banga: { name: "Banga Soup & Starch", price: "₦3,500", category: "Soups", image: "image/bangasoup1.jpg", description: "Rich, traditional palm fruit soup made from fresh banga seeds, slow-cooked with assorted meat. Served with freshly prepared starch.", includes: ["Large bowl of Banga Soup (400ml)", "Fresh starch wrap", "Assorted meat (3 pieces)", "Extra stock on request"] },
  suya: { name: "Suya Platter (500g)", price: "₦4,200", category: "Grills & BBQ", image: "image/Suya.jpeg", description: "Tender beef suya coated in our smoky peanut spice blend, grilled fresh and served hot with onions and tomatoes.", includes: ["500g beef suya", "Fresh onions and tomatoes", "Pepper sauce", "Extra spice on request"] },
  jollof: { name: "Jollof Rice & Grilled Chicken", price: "₦2,800", category: "Rice Dishes", image: "image/Jollof rice and grilled chicken.jpeg", description: "Smoky party-style jollof rice, served with juicy grilled chicken and a side of sweet fried plantain.", includes: ["Jollof rice", "Grilled chicken piece", "Fried plantain", "Fresh coleslaw"] },
  egusi: { name: "Egusi Soup & Pounded Yam", price: "₦3,200", category: "Soups", image: "image/Egusi and Pounded yam.jpeg", description: "A rich melon seed soup cooked with leafy vegetables and assorted meat, paired with soft pounded yam.", includes: ["Large Egusi Soup", "Pounded yam wrap", "Assorted meat", "Extra pepper on request"] },
  puff: { name: "Artisan Puff-Puff", price: "₦1,200", category: "Pastries", image: "img/puff puff.jpeg", description: "Warm, fluffy puff-puff made fresh every morning and lightly dusted with sugar.", includes: ["Eight fresh puff-puff", "Pepper dip", "Served warm"] },
  onugbu: { name: "Ofe Onugbu & Fufu", price: "₦3,600", category: "Soups", image: "image/Ofe Onugbo soup.jpeg", description: "Traditional bitter leaf soup carefully cooked with beef, stockfish and aromatic local spices, served with soft fufu.", includes: ["Ofe Onugbu soup", "Fresh fufu wrap", "Beef and stockfish", "Extra pepper on request"] },
  white: { name: "White Soup & Fufu", price: "₦4,200", category: "Soups", image: "image/White soup and fufu.jpeg", description: "A light, fragrant pepper soup filled with fresh fish and traditional spices, served with a warm fufu wrap.", includes: ["White soup with fish", "Fresh fufu wrap", "Traditional spices", "Chef's pepper blend"] },
  afang: { name: "Afang Soup & Semolina", price: "₦3,500", category: "Soups", image: "image/afang.jpg", description: "A rich Afang vegetable soup with waterleaf, assorted meat and our signature stock, served with semolina.", includes: ["Afang vegetable soup", "Semolina wrap", "Assorted meat", "Extra stock on request"] },
  spaghetti: { name: "Jollof Spaghetti Special", price: "₦2,200", category: "English Meals", image: "image/Stirfry spaghetti.jpeg", description: "Spiced jollof spaghetti cooked with vegetables and tender chicken strips for a comforting, filling meal.", includes: ["Jollof spaghetti", "Chicken strips", "Fresh vegetables", "Pepper sauce"] },
  turkey: { name: "Spicy Grilled Turkey", price: "₦3,800", category: "Grills & BBQ", image: "img/turkey.jpeg", description: "Well-seasoned turkey grilled over open heat and brushed with Oga Grill's smoky house sauce.", includes: ["Grilled turkey portion", "House pepper sauce", "Fresh onions", "Choice of plantain or fries"] },
  chops: { name: "Small Chops Platter", price: "₦6,500", category: "Pastries & Small Chops", image: "image/Small chops.jpeg", description: "A generous sharing platter with puff-puff, samosa, spring rolls and other freshly made party favourites.", includes: ["Puff-puff", "Samosa", "Spring rolls", "Pepper dip"] },
  default: { name: "Chef's Special", price: "₦3,500", category: "Made to Order", image: "image/Stew.jpeg", description: "A freshly prepared homemade dish from one of our trusted local chefs.", includes: ["Freshly made meal", "Chef's selected sides", "Made to order"] }
};

let extraProducts = [
  { match: "prawn fried rice", price: "₦4,500", image: "image/coconut rice bowl.jpg" },
  { match: "fried rice", price: "₦3,000", image: "image/Fried rice.jpeg" },
  { match: "creamy", price: "₦3,600", image: "image/creamy pasta.jpg" },
  { match: "chips", price: "₦2,900", image: "image/chips.jpg" },
  { match: "grilled chicken", price: "₦2,500", image: "image/grilled chicken.jpg" },
  { match: "chicken wrap", price: "₦2,400", image: "image/chicken shawarma.jpg" },
  { match: "shawarma", price: "₦2,500", image: "image/chicken shawarma.jpg" },
  { match: "chicken caesar", price: "₦2,700", image: "image/chicken-salad.jpg" },
  { match: "garden salad", price: "₦2,100", image: "image/garden salad bowl.jpg" },
  { match: "tuna pasta", price: "₦2,600", image: "image/tuna pasta salad.jpg" },
  { match: "chocolate cake", price: "₦2,000", image: "image/chocolate cake.jpg" },
  { match: "fruit parfait", price: "₦1,900", image: "image/parfiet.jpg" },
  { match: "coconut rice", price: "₦2,600", image: "image/coconut rice bowl.jpg" },
  { match: "peppered fish", price: "₦4,000", image: "image/peppered fish.jpg" },
  { match: "tigernut", price: "₦1,300", image: "image/tigernut.jpg" },
  { match: "zobo", price: "₦2,000", image: "image/zobo.jpg" },
  { match: "pineapple", price: "₦1,200", image: "image/pineapple juice.jpg" },
  { match: "chapman", price: "₦1,500", image: "image/chapman.jpg" },
  { match: "grill combo", price: "₦7,200", image: "image/grill combo.jpg" },
  { match: "pastry breakfast", price: "₦3,900", image: "image/pastry breakfast box.jpg" },
  { match: "yam porridge", price: "₦1,800", image: "image/Yam porridge.jpeg" },
  { match: "efo", price: "₦2,700", image: "image/efo.jpg" },
  { match: "ofada", price: "₦3,400", image: "image/ofada.jpg" },
  { match: "beans", price: "₦2,000", image: "image/beans n plantain.jpg" },
  { match: "gizzard", price: "₦2,700", image: "image/gizzard.jpg" },
  { match: "tilapia", price: "₦5,500", image: "image/Grilled tilapia and plantain.jpeg" },
  { match: "wings", price: "₦2,400", image: "image/wings.jpg" },
  { match: "pie", price: "₦1,500", image: "image/pie.jpg" },
  { match: "chin chin", price: "₦1,800", image: "image/chin chin.jpg" },
  { match: "cupcake", price: "₦4,000", image: "image/cupcake.jpg" },
  { match: "pepper soup", price: "₦3,800", image: "image/peppersoup.jpeg" }
];

let categoryMenus = {
  soup: { emoji: "🍲", title: "Soups & Stews", subtitle: "Comforting bowls made close to home", description: "Warm, rich and full of flavour — every bowl is cooked fresh by a local chef.", dishes: [["Banga Soup & Starch", "Rich palm fruit soup with assorted meat.", "₦3,500"], ["Egusi Soup & Pounded Yam", "Melon seed soup with tender meat.", "₦3,200"], ["Ofe Onugbu & Fufu", "Bitter leaf soup with soft fufu.", "₦3,600"], ["White Soup & Fufu", "Light fish soup with traditional spices.", "₦4,200"]] },
  grill: { emoji: "🔥", title: "Grills & BBQ", subtitle: "Smoky favourites fresh from the fire", description: "From spicy suya to juicy turkey, enjoy the bold flavour of a proper grill.", dishes: [["Suya Platter", "Smoky beef suya with pepper and onions.", "₦4,200"], ["Grilled Turkey", "Spicy turkey straight from the grill.", "₦3,800"], ["Grilled Chicken", "Charcoal chicken with pepper sauce.", "₦2,500"], ["Whole Grilled Tilapia", "Fire-grilled tilapia with plantain.", "₦5,500"]] },
  pastry: { emoji: "🥐", title: "Pastries & Baked", subtitle: "Freshly baked treats for every mood", description: "Warm pastries, crunchy snacks and sharing platters made by neighbourhood bakers.", dishes: [["Small Chops Platter", "Samosa, spring rolls and puff-puff.", "₦6,500"], ["Artisan Puff-Puff", "Warm, fluffy and freshly fried.", "₦1,200"], ["Meat Pie", "Buttery pastry with seasoned beef.", "₦1,500"], ["Chicken Pie", "Flaky pastry with creamy chicken.", "₦1,700"]] },
  rice: { emoji: "🍛", title: "Rice Dishes", subtitle: "Big flavour in every grain", description: "Party jollof, local rice and comforting bowls made to satisfy your hunger.", dishes: [["Jollof Rice & Grilled Chicken", "Smoky jollof with chicken and plantain.", "₦2,800"], ["Fried Rice & Chicken", "Vegetable fried rice with grilled chicken.", "₦3,000"], ["Ofada Rice & Sauce", "Local rice with rich ayamase sauce.", "₦3,400"], ["Party Jollof Family Bowl", "A shareable bowl for four people.", "₦7,500"]] },
  salad: { emoji: "🥗", title: "Salads & Wraps", subtitle: "Fresh, colourful and satisfying", description: "Lighter meals full of crisp vegetables, creamy dressings and delicious fillings.", dishes: [["Chicken Caesar Salad", "Grilled chicken, greens and parmesan.", "₦2,700"], ["Suya Chicken Wrap", "Spicy chicken in a fresh tortilla wrap.", "₦2,400"], ["Garden Salad Bowl", "Seasonal greens with house dressing.", "₦2,100"], ["Tuna Pasta Salad", "Tuna, pasta and crunchy vegetables.", "₦2,600"]] },
  dessert: { emoji: "🍰", title: "Desserts & Sweets", subtitle: "A sweet finish to your day", description: "Handmade treats, cakes and little indulgences baked with love.", dishes: [["Six-Cupcake Box", "Vanilla and chocolate cupcakes.", "₦4,000"], ["Chin Chin Jar", "Sweet, crunchy bite-size treats.", "₦1,800"], ["Chocolate Cake Slice", "Soft chocolate sponge with ganache.", "₦2,000"], ["Fruit Parfait", "Yoghurt, fruit and granola layers.", "₦1,900"]] },
  onepot: { emoji: "🍳", title: "One-Pot Meals", subtitle: "Everything you love in one bowl", description: "Hearty, filling meals cooked together for deep flavour and easy comfort.", dishes: [["Yam Porridge", "Soft yam in rich tomato sauce.", "₦1,800"], ["Beans & Plantain", "Slow-cooked beans and ripe plantain.", "₦2,000"], ["Coconut Rice Bowl", "Fragrant rice with vegetables.", "₦2,600"], ["Spaghetti Stir Fry", "Spiced noodles with chicken.", "₦2,200"]] },
  seafood: { emoji: "🐟", title: "Seafood", subtitle: "Fresh catches, beautifully cooked", description: "Fish, prawns and seafood dishes from cooks who know how to bring out the flavour.", dishes: [["Whole Grilled Tilapia", "Fire-grilled fish with plantain.", "₦5,500"], ["Peppered Fish", "Spicy fish in rich pepper sauce.", "₦4,000"], ["Prawn Fried Rice", "Rice with juicy prawns and vegetables.", "₦4,500"], ["Fish Pepper Soup", "Light, spicy and deeply comforting.", "₦3,800"]] },
  drink: { emoji: "🥤", title: "Drinks & Juices", subtitle: "Fresh sips for every meal", description: "Cool down with fresh blends and traditional drinks made to order.", dishes: [["Zobo & Chin-Chin Combo", "Cold zobo with crunchy chin chin.", "₦2,000"], ["Fresh Pineapple Juice", "Chilled, freshly pressed pineapple.", "₦1,200"], ["Chapman", "A classic fruity mocktail.", "₦1,500"], ["Tigernut Milk", "Creamy homemade kunnu aya.", "₦1,300"]] },
  street: { emoji: "🌮", title: "Street Food", subtitle: "The neighbourhood favourites", description: "Quick, tasty and full of character — street food made fresh and served hot.", dishes: [["Suya Platter", "Smoky beef suya with pepper.", "₦4,200"], ["Gizzard & Plantain", "Spicy gizzard with ripe plantain.", "₦2,700"], ["Puff-Puff & Pepper", "Sweet puff-puff with spicy dip.", "₦1,200"], ["Chicken Shawarma", "Loaded wrap with grilled chicken.", "₦2,500"]] },
  combo: { emoji: "🍱", title: "Meal Combos", subtitle: "More flavour, one easy order", description: "Complete your meal with perfectly paired food, drinks and snacks.", dishes: [["Small Chops Platter", "The ultimate sharing combo.", "₦6,500"], ["Jollof Family Bowl", "Jollof, chicken and drinks for four.", "₦9,500"], ["Grill Combo", "Suya, wings and plantain.", "₦7,200"], ["Pastry Breakfast Box", "Pies, puff-puff and a drink.", "₦3,900"]] }
};

function updateCart() {
  cart = cartItems.reduce(function (total, item) {
    return total + Number(item.quantity);
  }, 0);

  cartNumbers.forEach(function (number) {
    number.textContent = cart;
  });

  saveCart(cartItems);
}

function showToast(message) {
  if (!toast) return;

  clearTimeout(timer);
  toast.textContent = message;
  toast.classList.add("show");

  timer = setTimeout(function () {
    toast.classList.remove("show");
  }, 2000);
}

function getProduct(item) {
  let name = item.toLowerCase();

  let extraProduct = extraProducts.find(function (product) {
    return name.includes(product.match);
  });

  if (extraProduct) {
    return {
      name: item,
      price: extraProduct.price,
      category: "Chef's Menu",
      image: extraProduct.image,
      description: "A freshly prepared " + item + " from a trusted HomePot chef.",
      includes: products.default.includes
    };
  }

  if (name.includes("suya")) return products.suya;
  if (name.includes("jollof")) return products.jollof;
  if (name.includes("egusi")) return products.egusi;
  if (name.includes("puff")) return products.puff;
  if (name.includes("onugbu")) return products.onugbu;
  if (name.includes("white soup")) return products.white;
  if (name.includes("afang")) return products.afang;
  if (name.includes("spaghetti")) return products.spaghetti;
  if (name.includes("turkey")) return products.turkey;
  if (name.includes("chops")) return products.chops;
  if (name.includes("banga")) return products.banga;

  return {
    name: item,
    price: products.default.price,
    category: "Chef's Menu",
    image: products.default.image,
    description: "A freshly prepared " + item + " made to order by one of our trusted local chefs.",
    includes: products.default.includes
  };
}

function loadProduct() {
  if (!productTitle) return;

  let item = new URLSearchParams(window.location.search).get("item") || "Banga Soup & Starch";
  let product = getProduct(item);

  productImage.src = product.image;
  productImage.alt = product.name;
  productTitle.textContent = product.name;
  document.title = product.name + " | HomePot";
  productPrice.textContent = product.price;
  productRating.textContent = "★★★★★ 4.9 (89) · Chef Amaka · 25 min";
  productDescription.textContent = product.description;
  productBreadcrumb.textContent = "Home / " + product.category + " / Made to Order";
  productAddButton.dataset.food = product.name;
  productAddButton.textContent = "Add to Cart · " + product.price;
  customizeLink.href = "customize.html?item=" + encodeURIComponent(product.name);
  productIncludes.innerHTML = "";

  product.includes.forEach(function (item) {
    let listItem = document.createElement("li");
    listItem.textContent = item;
    productIncludes.appendChild(listItem);
  });
}

function loadCustomizeItem() {
  if (!customizeItem) return;

  let item = new URLSearchParams(window.location.search).get("item") || "Banga Soup & Starch";
  customizeItem.textContent = item + " · Chef Amaka";
  customizeAddButton.dataset.food = "Customized " + item;
}

function loadCategoryMenu() {
  if (!categoryPageTitle) return;

  let category = new URLSearchParams(window.location.search).get("category") || "soup";
  let menu = categoryMenus[category] || categoryMenus.soup;

  categoryPageEmoji.textContent = menu.emoji;
  categoryPageTitle.textContent = menu.title;
  categoryPageDescription.textContent = menu.description;
  categoryPageSubtitle.textContent = menu.subtitle;
  categoryPageDishes.innerHTML = "";

  menu.dishes.forEach(function (dish, index) {
    let link = document.createElement("a");
    let image = document.createElement("img");
    let content = document.createElement("div");
    let title = document.createElement("h3");
    let description = document.createElement("p");
    let price = document.createElement("b");
    let product = getProduct(dish[0]);

    link.className = "category-dish";
    link.href = "product.html?item=" + encodeURIComponent(dish[0]);
    image.src = product.image;
    image.alt = dish[0];
    title.textContent = dish[0];
    description.textContent = dish[1];
    price.textContent = dish[2];
    content.append(title, description, price);
    link.append(image, content);
    categoryPageDishes.appendChild(link);
  });
}

function filterCards(word) {
  if (cards.length === 0) return;

  let searchWord = word.toLowerCase().trim();
  let results = 0;

  cards.forEach(function (card) {
    if (card.dataset.search.includes(searchWord)) {
      card.classList.remove("hide");
      results++;
    } else {
      card.classList.add("hide");
    }
  });

  if (noResults) {
    noResults.hidden = results !== 0;
  }
}

function goToResults(word) {
  window.location.href = "results.html?search=" + encodeURIComponent(word);
}

function addToCart(button) {
  let foodName = button.dataset.food || "Item";
  let product = getProduct(foodName);
  let selectedQuantity = button === productAddButton && quantity ? Number(quantity.textContent) : 1;
  let productId = product.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  let savedItem = cartItems.find(function (item) {
    return item.id === productId;
  });

  if (savedItem) {
    savedItem.quantity += selectedQuantity;
  } else {
    cartItems.push({
      id: productId,
      name: product.name,
      price: Number(String(product.price).replace(/[₦,]/g, "")),
      image: new URL(product.image, document.baseURI).href,
      quantity: selectedQuantity
    });
  }

  updateCart();
  showToast(product.name + " added to your cart.");
}

function loadCartPage() {
  if (!cartItemsBox) return;

  cartItemsBox.innerHTML = "";

  if (cartItems.length === 0) {
    let emptyMessage = document.createElement("div");
    emptyMessage.className = "empty-cart";
    emptyMessage.innerHTML = "<h2>Your cart is empty</h2><p>Add some food to your cart.</p>";
    cartItemsBox.appendChild(emptyMessage);
    updateTotals();
    return;
  }

  cartItems.forEach(function (item) {
    let cartItem = document.createElement("article");
    let image = document.createElement("img");
    let itemInfo = document.createElement("div");
    let itemName = document.createElement("h2");
    let itemPrice = document.createElement("p");
    let itemTotal = document.createElement("b");
    let itemQuantity = document.createElement("div");
    let decreaseButton = document.createElement("button");
    let quantityNumber = document.createElement("span");
    let increaseButton = document.createElement("button");
    let removeButton = document.createElement("button");

    cartItem.className = "cart-item";
    image.className = "cart-item-image";
    image.src = item.image || new URL(getProduct(item.name).image, document.querySelector(".logo").href).href;
    image.alt = item.name;
    itemName.textContent = item.name;
    itemPrice.textContent = formatMoney(item.price) + " each";
    itemTotal.textContent = formatMoney(Number(item.price) * Number(item.quantity));
    itemQuantity.className = "cart-quantity";
    decreaseButton.type = "button";
    decreaseButton.dataset.cartAction = "decrease";
    decreaseButton.dataset.id = item.id;
    decreaseButton.textContent = "−";
    quantityNumber.textContent = item.quantity;
    increaseButton.type = "button";
    increaseButton.dataset.cartAction = "increase";
    increaseButton.dataset.id = item.id;
    increaseButton.textContent = "+";
    removeButton.className = "remove-cart-item";
    removeButton.dataset.cartAction = "remove";
    removeButton.dataset.id = item.id;
    removeButton.textContent = "Remove";

    itemQuantity.append(decreaseButton, quantityNumber, increaseButton);
    itemInfo.append(itemName, itemPrice, itemTotal, itemQuantity);
    cartItem.append(image, itemInfo, removeButton);
    cartItemsBox.appendChild(cartItem);
  });

  updateTotals();
}

function changeQuantity(productId, amount) {
  let product = cartItems.find(function (item) {
    return item.id === productId;
  });

  if (!product) return;

  product.quantity += amount;

  if (product.quantity <= 0) {
    cartItems = cartItems.filter(function (item) {
      return item.id !== productId;
    });
  }

  updateCart();
  loadCartPage();
}

function removeCartItem(productId) {
  cartItems = cartItems.filter(function (item) {
    return item.id !== productId;
  });
  updateCart();
  loadCartPage();
}

function updateTotals() {
  let subtotal = cartItems.reduce(function (total, item) {
    return total + Number(item.price) * Number(item.quantity);
  }, 0);
  let deliveryFee = subtotal === 0 || subtotal >= 10000 ? 0 : 500;
  let serviceFee = subtotal === 0 ? 0 : 200;
  let total = subtotal + deliveryFee + serviceFee;
  let subtotalElement = document.querySelector("#subtotal");
  let deliveryElement = document.querySelector("#delivery-fee");
  let serviceElement = document.querySelector("#service-fee");
  let totalElement = document.querySelector("#total");
  let freeDelivery = document.querySelector("#free-delivery");
  let checkoutButton = document.querySelector("#checkout-button");

  if (subtotalElement) subtotalElement.textContent = formatMoney(subtotal);
  if (deliveryElement) deliveryElement.textContent = deliveryFee === 0 && subtotal > 0 ? "FREE" : formatMoney(deliveryFee);
  if (serviceElement) serviceElement.textContent = formatMoney(serviceFee);
  if (totalElement) totalElement.textContent = formatMoney(total);
  if (freeDelivery) {
    freeDelivery.textContent = subtotal >= 10000 ? "✓ You qualify for free delivery" : subtotal === 0 ? "Free delivery on orders above ₦10,000" : "Add " + formatMoney(10000 - subtotal) + " more for free delivery";
  }
  if (checkoutButton) {
    checkoutButton.classList.toggle("disabled", cartItems.length === 0);
    checkoutButton.setAttribute("aria-disabled", String(cartItems.length === 0));
  }
}

function openCart() {
  let path = window.location.pathname.toLowerCase();

  if (path.includes("/cart/")) {
    window.location.href = "Yourcart.html";
  } else if (path.includes("/delivery/")) {
    window.location.href = "../cart/Yourcart.html";
  } else {
    window.location.href = "cart/Yourcart.html";
  }
}

function closeMobileMenu() {
  if (!menuToggle || !pageNav) return;

  pageNav.classList.remove("open");
  menuToggle.textContent = "☰";
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
}

function migrateLegacyCart() {
  if (cartItems.length > 0) return;

  try {
    let legacyItems = JSON.parse(sessionStorage.getItem("homepot-cart-items"));

    if (!Array.isArray(legacyItems) || legacyItems.length === 0) return;

    cartItems = legacyItems.map(function (item) {
      let product = getProduct(item.name || "Chef's Special");
      return {
        id: product.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
        name: product.name,
        price: Number(String(item.price || product.price).replace(/[₦,]/g, "")),
        image: new URL(product.image, document.querySelector(".logo").href).href,
        quantity: Number(item.quantity) || 1
      };
    });
  } catch (error) {
    cartItems = [];
  }
}

function toggleMobileMenu() {
  if (!menuToggle || !pageNav) return;

  if (pageNav.classList.contains("open")) {
    closeMobileMenu();
  } else {
    pageNav.classList.add("open");
    menuToggle.textContent = "×";
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation menu");
  }
}

migrateLegacyCart();
updateCart();
loadProduct();
loadCustomizeItem();
loadCategoryMenu();
loadCartPage();

cartNumbers.forEach(function (number) {
  let cartButton = number.parentElement;

  cartButton.classList.add("cart-link");
  cartButton.setAttribute("role", "button");
  cartButton.setAttribute("tabindex", "0");
  cartButton.setAttribute("aria-label", "View cart");
  cartButton.addEventListener("click", openCart);
  cartButton.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openCart();
    }
  });
});

if (cartItemsBox) {
  cartItemsBox.addEventListener("click", function (event) {
    let button = event.target.closest("button[data-cart-action]");
    if (!button) return;

    if (button.dataset.cartAction === "increase") changeQuantity(button.dataset.id, 1);
    if (button.dataset.cartAction === "decrease") changeQuantity(button.dataset.id, -1);
    if (button.dataset.cartAction === "remove") removeCartItem(button.dataset.id);
  });
}

let checkoutButton = document.querySelector("#checkout-button");
if (checkoutButton) {
  checkoutButton.addEventListener("click", function (event) {
    if (cartItems.length === 0) {
      event.preventDefault();
      showToast("Your cart is empty. Add a meal before payment.");
    }
  });
}

if (menuToggle && pageNav) {
  menuToggle.addEventListener("click", toggleMobileMenu);

  pageNav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMobileMenu);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeMobileMenu();
    }
  });
}

productLinks.forEach(function (link) {
  link.addEventListener("click", function (event) {
    let heading = link.querySelector("h2");

    if (heading) {
      event.preventDefault();
      window.location.href = "product.html?item=" + encodeURIComponent(heading.textContent);
    }
  });
});

if (searchInput) {
  searchInput.addEventListener("input", function () {
    filterCards(searchInput.value);
  });

  searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      goToResults(searchInput.value);
    }
  });
}

pageSearch.forEach(function (input) {
  input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      goToResults(input.value);
    }
  });
});

if (heroForm) {
  heroForm.addEventListener("submit", function (event) {
    event.preventDefault();
    goToResults(heroSearch.value);
  });
}

categoryButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    window.location.href = "category-menu.html?category=" + button.dataset.search;
  });
});

addButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    addToCart(button);
  });
});

if (plusButton && minusButton && quantity) {
  plusButton.addEventListener("click", function () {
    quantity.textContent = Number(quantity.textContent) + 1;
  });

  minusButton.addEventListener("click", function () {
    if (Number(quantity.textContent) > 1) {
      quantity.textContent = Number(quantity.textContent) - 1;
    }
  });
}

if (newsletterForm) {
  newsletterForm.addEventListener("submit", function (event) {
    event.preventDefault();
    newsletterMessage.textContent = "Thank you for subscribing to HomePot!";
    email.value = "";
  });
}

if (resultsSearch && resultsText) {
  let search = new URLSearchParams(window.location.search).get("search") || "food";
  resultsSearch.value = search;
  resultsText.textContent = "Showing results for “" + search + "”";
}
