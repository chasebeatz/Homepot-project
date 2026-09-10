document.addEventListener("DOMContentLoaded", function () {

    const section = document.getElementById("customerReviews");

    if (!section) {
        return;
    }

    const track = section.querySelector(".reviews-track");
    const originalCards = Array.from(
        section.querySelectorAll(".review-card")
    );

    if (!track || originalCards.length === 0) {
        return;
    }

    let currentIndex = 0;
    let cardWidth = 0;
    let autoSlide;

    /*
        Make copies of all the cards.
        This allows the beginning to appear
        immediately after the ending.
    */
    originalCards.forEach(function (card) {

        const clone = card.cloneNode(true);

        clone.classList.add("review-clone");

        track.appendChild(clone);
    });

    const allCards = track.querySelectorAll(".review-card");

    function calculateCardWidth() {

        const style = window.getComputedStyle(track);
        const gap = parseFloat(style.gap) || 0;

        cardWidth = originalCards[0].offsetWidth + gap;
    }

    calculateCardWidth();

    /*
        Move the reviews continuously.
    */
    function moveReviews() {

        currentIndex++;

        track.style.transition = "transform 0.8s ease-in-out";

        track.style.transform =
            "translateX(-" + (currentIndex * cardWidth) + "px)";

        /*
            When we reach the cloned beginning,
            quietly return to the real beginning.

            The user will not see the jump because
            the cloned cards look exactly the same.
        */
        if (currentIndex === originalCards.length) {

            setTimeout(function () {

                track.style.transition = "none";

                currentIndex = 0;

                track.style.transform = "translateX(0)";

            }, 800);
        }
    }

    /*
        Automatically move every 10 seconds.
    */
    autoSlide = setInterval(moveReviews, 5000);


    /*
        Clicking a card still works.
    */
    allCards.forEach(function (card, index) {

        card.style.cursor = "pointer";

        card.addEventListener("click", function () {

            clearInterval(autoSlide);

            /*
                Only use the original cards
                for the click position.
            */
            let clickedIndex = index;

            if (clickedIndex >= originalCards.length) {
                clickedIndex =
                    clickedIndex - originalCards.length;
            }

            currentIndex = clickedIndex;

            track.style.transition =
                "transform 0.8s ease-in-out";

            track.style.transform =
                "translateX(-" +
                (currentIndex * cardWidth) +
                "px)";

            /*
                Start the automatic movement again.
            */
            autoSlide = setInterval(
                moveReviews,
                10000
            );
        });

    });


    /*
        Recalculate the card width if
        the screen size changes.
    */
    window.addEventListener("resize", function () {

        calculateCardWidth();

        track.style.transition = "none";

        track.style.transform =
            "translateX(-" +
            (currentIndex * cardWidth) +
            "px)";
    });

});