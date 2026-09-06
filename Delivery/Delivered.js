// ==============================
// ORDER DELIVERED PAGE
// ==============================

const rateButton = document.getElementById("rateButton");
const wrongButton = document.getElementById("wrongButton");


// Rate Your Experience
rateButton.addEventListener("click", function () {

    // Change this to the name of your rating page
    window.location.href = "rating.html";

});


// Something Wrong?
wrongButton.addEventListener("click", function () {

    // Change this to the name of your problem/report page
    window.location.href = "something-wrong.html";

});