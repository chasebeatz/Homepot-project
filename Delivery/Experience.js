document.addEventListener("DOMContentLoaded", function () {

    const chefStars = document.querySelectorAll("#chefStars span");
    const comment = document.getElementById("comment");
    const submitButton = document.getElementById("submitReview");
    const message = document.getElementById("message");

    let selectedRating = 0;

    // STAR RATING
    chefStars.forEach(function (star) {

        star.addEventListener("click", function () {

            selectedRating = Number(this.dataset.rating);

            chefStars.forEach(function (item) {

                const rating = Number(item.dataset.rating);

                if (rating <= selectedRating) {
                    item.classList.add("active");
                } else {
                    item.classList.remove("active");
                }

            });

        });

    });


    // LOVE TAGS
    const tags = document.querySelectorAll(".tags button");

    tags.forEach(function (tag) {

        tag.addEventListener("click", function () {
            this.classList.toggle("selected");
        });

    });


    // SUBMIT REVIEW
    submitButton.addEventListener("click", function () {

        if (selectedRating === 0) {
            message.textContent = "Please select a rating first.";
            return;
        }

        message.textContent = "Thank you! Your review has been submitted.";

        submitButton.textContent = "Review Submitted";
        submitButton.disabled = true;

    });

});