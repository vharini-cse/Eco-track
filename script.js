/* =========================================
   ECOTRACK
   JAVASCRIPT
========================================= */


/* =========================================
   HABITS
========================================= */

const habitCheckboxes =
    document.querySelectorAll(".habit-checkbox");

const habitCards =
    document.querySelectorAll(".habit-card");

const completedCount =
    document.getElementById("completed-count");

const ecoScore =
    document.getElementById("eco-score");

const circleScore =
    document.getElementById("circle-score");

const progressFill =
    document.getElementById("progress-fill");

const progressPercent =
    document.getElementById("progress-percent");

const completionMessage =
    document.getElementById("completion-message");

const progressMessage =
    document.getElementById("progress-message");

const heroProgress =
    document.getElementById("hero-progress");

const heroProgressText =
    document.getElementById("hero-progress-text");

const waterSaved =
    document.getElementById("water-saved");

const energySaved =
    document.getElementById("energy-saved");


/* =========================================
   LOAD SAVED HABITS
========================================= */

window.addEventListener("DOMContentLoaded", () => {

    const savedHabits =
        JSON.parse(
            localStorage.getItem("ecoTrackHabits")
        );

    if (savedHabits) {

        habitCheckboxes.forEach(
            (checkbox, index) => {

                checkbox.checked =
                    savedHabits[index] || false;

            }
        );

    }

    updateDashboard();

});


/* =========================================
   HABIT CLICK
========================================= */

habitCheckboxes.forEach(
    (checkbox, index) => {

        checkbox.addEventListener(
            "change",
            () => {

                updateDashboard();

                saveHabits();

            }
        );

    }
);


/* =========================================
   SAVE HABITS
========================================= */

function saveHabits() {

    const habitStatus = [];

    habitCheckboxes.forEach(
        checkbox => {

            habitStatus.push(
                checkbox.checked
            );

        }
    );

    localStorage.setItem(
        "ecoTrackHabits",
        JSON.stringify(habitStatus)
    );

}


/* =========================================
   UPDATE DASHBOARD
========================================= */

function updateDashboard() {

    let completed = 0;

    let water = 0;

    let energy = 0;

    let score = 0;


    habitCards.forEach(
        (card, index) => {

            const checkbox =
                card.querySelector(
                    ".habit-checkbox"
                );


            if (checkbox.checked) {

                completed++;

                card.classList.add(
                    "completed"
                );


                const points =
                    Number(
                        card.dataset.points
                    );

                const waterValue =
                    Number(
                        card.dataset.water
                    );

                const energyValue =
                    Number(
                        card.dataset.energy
                    );

                score += points;

                water += waterValue;

                energy += energyValue;

            } else {

                card.classList.remove(
                    "completed"
                );

            }

        }
    );


    const totalHabits =
        habitCheckboxes.length;

    const percentage =
        Math.round(
            (completed / totalHabits) * 100
        );


    /* Dashboard */

    completedCount.textContent =
        completed;

    ecoScore.textContent =
        score;

    circleScore.textContent =
        score;

    waterSaved.textContent =
        water;

    energySaved.textContent =
        energy;


    /* Progress */

    progressFill.style.width =
        percentage + "%";

    progressPercent.textContent =
        percentage + "%";


    /* Hero */

    heroProgress.style.width =
        percentage + "%";

    heroProgressText.textContent =
        percentage +
        "% completed";


    /* Messages */

    updateMessages(
        completed,
        percentage
    );


    /* Achievements */

    updateAchievements(
        completed
    );

}


/* =========================================
   MESSAGES
========================================= */

function updateMessages(
    completed,
    percentage
) {

    if (completed === 0) {

        completionMessage.textContent =
            "🌱 Start completing your eco habits!";

        progressMessage.textContent =
            "Complete your first habit to begin.";

    }

    else if (completed < 3) {

        completionMessage.textContent =
            "🌿 Great start! Keep building your green habits.";

        progressMessage.textContent =
            "You're on your way. Keep going!";

    }

    else if (completed < 5) {

        completionMessage.textContent =
            "🌳 You're making meaningful choices for the planet!";

        progressMessage.textContent =
            "Excellent progress! Just a few more habits.";

    }

    else {

        completionMessage.textContent =
            "🌍 Amazing! You've completed all your eco habits today!";

        progressMessage.textContent =
            "Perfect eco day! Every small action matters.";

    }

}


/* =========================================
   ACHIEVEMENTS
========================================= */

function updateAchievements(
    completed
) {

    const achievement1 =
        document.getElementById(
            "achievement-1"
        );

    const achievement2 =
        document.getElementById(
            "achievement-2"
        );

    const achievement3 =
        document.getElementById(
            "achievement-3"
        );


    /* First Step */

    if (completed >= 1) {

        achievement1.classList.add(
            "unlocked"
        );

    } else {

        achievement1.classList.remove(
            "unlocked"
        );

    }


    /* Green Starter */

    if (completed >= 3) {

        achievement2.classList.add(
            "unlocked"
        );

    } else {

        achievement2.classList.remove(
            "unlocked"
        );

    }


    /* Eco Champion */

    if (completed >= 5) {

        achievement3.classList.add(
            "unlocked"
        );

    } else {

        achievement3.classList.remove(
            "unlocked"
        );

    }

}


/* =========================================
   ECO TIPS
========================================= */

const ecoTips = [

    "Carry a reusable bottle with you to reduce single-use plastic waste.",

    "Switch off lights and electronics when you are not using them.",

    "Choose walking or cycling for short-distance travel whenever possible.",

    "Use reusable shopping bags instead of single-use plastic bags.",

    "Separate recyclable materials from general household waste.",

    "Use natural light during the day whenever possible.",

    "Take shorter showers to reduce unnecessary water consumption.",

    "Planting and caring for trees can help support local ecosystems.",

    "Buy only what you need and avoid unnecessary consumption.",

    "Repair and reuse items before deciding to replace them."

];


const ecoTipText =
    document.getElementById(
        "eco-tip-text"
    );

const newTipButton =
    document.getElementById(
        "new-tip"
    );


newTipButton.addEventListener(
    "click",
    () => {

        const randomIndex =
            Math.floor(
                Math.random() *
                ecoTips.length
            );

        ecoTipText.style.opacity = "0";


        setTimeout(
            () => {

                ecoTipText.textContent =
                    ecoTips[randomIndex];

                ecoTipText.style.opacity =
                    "1";

            },
            200
        );

    }
);


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
    document.querySelectorAll(
        ".stat-card, .habit-card, .achievement-card, .eco-tip"
    );


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.style.opacity =
                            "1";

                        entry.target.style.transform =
                            "translateY(0)";

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(
    element => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(20px)";

        element.style.transition =
            "opacity 0.6s ease, transform 0.6s ease";

        revealObserver.observe(
            element
        );

    }
);


/* =========================================
   NAVIGATION
========================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(
    link => {

        link.addEventListener(
            "click",
            function (event) {

                const target =
                    document.querySelector(
                        this.getAttribute("href")
                    );


                if (target) {

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    }
);