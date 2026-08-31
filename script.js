let searchInput = document.querySelector("#search");
let heroForm = document.querySelector("#hero-form");
let heroSearch = document.querySelector("#hero-search");
let cards = document.querySelectorAll(".searchable");
let noResults = document.querySelector("#no-results");
let categoryButtons = document.querySelectorAll(".category");
let addButtons = document.querySelectorAll(".add");
let cartCount = document.querySelector("#cart-count");
let newsletterForm = document.querySelector("#newsletter-form");
let email = document.querySelector("#email");
let newsletterMessage = document.querySelector("#newsletter-message");
let toast = document.querySelector("#toast");

let cart = 0;
let timer;

function filterFood(word) {
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

  noResults.hidden = results !== 0;
}

function showMessage(message) {
  clearTimeout(timer);
  toast.textContent = message;
  toast.classList.add("show");

  timer = setTimeout(function () {
    toast.classList.remove("show");
  }, 2000);
}

searchInput.addEventListener("input", function () {
  filterFood(searchInput.value);
});

heroForm.addEventListener("submit", function (event) {
  event.preventDefault();
  searchInput.value = heroSearch.value;
  filterFood(heroSearch.value);
  document.querySelector("#nearby").scrollIntoView({ behavior: "smooth" });
});

categoryButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    searchInput.value = button.dataset.search;
    filterFood(button.dataset.search);
    document.querySelector("#popular").scrollIntoView({ behavior: "smooth" });
  });
});

addButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    cart++;
    cartCount.textContent = cart;
    showMessage(button.dataset.food + " added to your cart.");
  });
});

newsletterForm.addEventListener("submit", function (event) {
  event.preventDefault();
  newsletterMessage.textContent = "Thank you for subscribing to HomePot!";
  email.value = "";
});
