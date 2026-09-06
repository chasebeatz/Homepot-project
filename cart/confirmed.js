// ===============================
// ORDER CONFIRMED PAGE
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    const trackOrderBtn = document.getElementById("trackOrderBtn");
    const homeBtn = document.getElementById("homeBtn");

    const previousBtn = document.getElementById("previousBtn");
    const nextBtn = document.getElementById("nextBtn");


    // ===============================
    // TRACK MY ORDER
    // ===============================

    trackOrderBtn.addEventListener("click", function () {

        // Change this to the page you want to open
        window.location.href = "track-order.html";

    });


    // ===============================
    // BACK TO HOME
    // ===============================

    homeBtn.addEventListener("click", function () {

        // Change this to your actual home page
        window.location.href = "index.html";

    });


    // ===============================
    // PREVIOUS PAGE
    // ===============================

    previousBtn.addEventListener("click", function () {

        window.history.back();

    });


    // ===============================
    // NEXT PAGE
    // ===============================

    nextBtn.addEventListener("click", function () {

        // Change this to the next page
        window.location.href = "track-order.html";

    });


    // ===============================
    // BUTTON PRESS EFFECT
    // ===============================

    const buttons = document.querySelectorAll("button");

    buttons.forEach(function (button) {

        button.addEventListener("mousedown", function () {
            button.style.transform = "scale(0.97)";
        });

        button.addEventListener("mouseup", function () {
            button.style.transform = "";
        });

        button.addEventListener("mouseleave", function () {
            button.style.transform = "";
        });

    });

});