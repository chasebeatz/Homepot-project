function updateAccountStatus() {
    const userName = localStorage.getItem("homepotSignedInUser");

    document.querySelectorAll(".cart, .cart-icon").forEach(function (cart) {
        cart.innerHTML = cart.innerHTML.replace(/🛒|🛍️?/g, "🛒");
    });

    if (!userName) {
        return;
    }

    document.querySelectorAll(".profile").forEach(function (profile) {
        profile.innerHTML = "👤 " + userName + " · Log out";
        profile.style.width = "auto";
        profile.style.minHeight = "34px";
        profile.style.padding = "0 10px";
        profile.style.display = "inline-flex";
        profile.style.alignItems = "center";
        profile.style.border = "1px solid #e96939";
        profile.style.borderRadius = "999px";
        profile.style.color = "#e96939";
        profile.style.background = "white";
        profile.style.fontSize = "11px";
        profile.style.fontWeight = "700";
        profile.style.cursor = "pointer";
        profile.title = "Click to log out";

        profile.addEventListener("click", function () {
            localStorage.removeItem("homepotSignedInUser");
            window.location.href = "../index.html";
        });
    });
}

updateAccountStatus();
