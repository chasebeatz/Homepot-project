let cart = Number(sessionStorage.getItem("homepot-cart")) || 0;
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

function updateCart() {
  cartNumbers.forEach(function (number) {
    number.textContent = cart;
  });

  sessionStorage.setItem("homepot-cart", cart);
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
  cart++;
  updateCart();
  showToast((button.dataset.food || "Item") + " added to your cart.");
}

updateCart();

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
    window.location.href = "browse.html?category=" + button.dataset.search;
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
