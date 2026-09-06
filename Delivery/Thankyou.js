const orderAgain = document.getElementById("orderAgain");
const backHome = document.getElementById("backHome");

/*
   Change these file names to the actual HTML files
   in your VS Code project.
*/

orderAgain.addEventListener("click", function () {
    window.location.href = "chef-menu.html";
});

backHome.addEventListener("click", function () {
    window.location.href = "home.html";
});