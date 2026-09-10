const steps = document.querySelectorAll(".progress-step");
const lines = document.querySelectorAll(".progress-line");

const deliveryTitle = document.getElementById("delivery-title");
const deliveryMessage = document.getElementById("delivery-message");


// How long each stage stays active
const stageTime = 2500;


// Current stage
let currentStage = 0;


// Update the progress bar
function updateProgress() {

    steps.forEach((step, index) => {

        step.classList.remove(
            "completed",
            "current",
            "delivered"
        );

        const circle = step.querySelector(".status-circle");

        circle.textContent = "";


        // Stages before the current stage
        if (index < currentStage) {

            step.classList.add("completed");

            circle.textContent = "✓";
        }


        // Current stage
        else if (index === currentStage) {

            step.classList.add("current");
        }

    });


    // Update lines
    lines.forEach((line, index) => {

        if (index < currentStage) {

            line.classList.add("completed");

        } else {

            line.classList.remove("completed");

        }

    });
}


// Move to the next stage
function moveToNextStage() {

    currentStage++;

    updateProgress();


    /*
        When currentStage reaches 4,
        Delivered becomes orange.
    */
    if (currentStage === 4) {

        const delivered = steps[4];

        delivered.classList.remove("current");
        delivered.classList.add("delivered");

        const deliveredCircle =
            delivered.querySelector(".status-circle");

        deliveredCircle.textContent = "✓";


        // Change the message
        deliveryTitle.textContent = "Delivered!";

        deliveryMessage.textContent =
            "Your order has been delivered successfully.";


        /*
            Give the user time to see
            the orange Delivered status.
        */
        setTimeout(function () {

            window.location.href = "delivered.html";

        }, 1500);

        return;
    }


    /*
        Move to the next stage automatically.
    */
    setTimeout(moveToNextStage, stageTime);
}


// Start
updateProgress();


// Confirmed → Preparing
setTimeout(moveToNextStage, stageTime);