const loginForm = document.getElementById("login-form");

if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      alert("Please enter your email or phone number and password.");
      return;
    }

    const userName = email.includes("@") ? email.split("@")[0] : email;
    localStorage.setItem("homepotSignedInUser", userName);
    window.location.href = "index.html";
  });
}
