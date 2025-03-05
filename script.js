let knownNumbers, timer;
let max_number = 40000000;

onload = function() {
    loadProgress();
    update_progress_bar();
    updateTimerDisplay();
    startTimer();
}

function saveProgress() {
    let gameData = {
        knownNumbers: Array.from(knownNumbers), // Convert the set to an array
        timer: timer,
        lastSave: Date.now()
    };
    localStorage.setItem("gameData", JSON.stringify(gameData));
}

function loadProgress() {
    let savedData = localStorage.getItem("gameData");
    if (savedData) {
        let gameData = JSON.parse(savedData);
        knownNumbers = new Set(gameData.knownNumbers);
        timer = gameData.timer;
        update_progress_bar();
    } else {
        console.log("no saved data, starting fresh");
        knownNumbers = new Set();
        timer = 0;
    }
}

// Timer functions
function updateTimerDisplay() {
    let date = new Date(null);
    date.setSeconds(timer);
    let timerDisplay = document.getElementById("timer");
    timerDisplay.innerHTML = date.toISOString().slice(11, 19);
}

function startTimer() {
    // Every second, save the progress and update the timer visual
    timerFunc = setInterval(function() {
        timer += 1;
        saveProgress();
        updateTimerDisplay();
    }, 1000);
}

function gen_random_number() {
    // Generate a random number between 1 and 40 million

    numberDisplay = document.getElementById("random_number");

    let random_number = Math.floor(Math.random() * max_number) + 1;

    random_number = Intl.NumberFormat().format(random_number);

    numberDisplay.innerHTML = random_number;

    if(!knownNumbers.has(random_number)) {
        knownNumbers.add(random_number);
        update_progress_bar();

        if(knownNumbers.size == max_number) {
            alert("Congrats! You've collected all 40,000,000 numbers!");
        }
    }
}

function update_progress_bar() {
    let progress_bar = document.getElementById("progress_bar");
    let progress_text = document.getElementById("progress_text");
    let progress_fraction = document.getElementById("fraction_text");
    
    // Update the progress bar
    let progress = (knownNumbers.size / max_number) * 100;
    progress_bar.style.width = progress + "%";

    progress_text.innerHTML = progress.toFixed(4) + "%";

    progress_fraction.innerHTML = knownNumbers.size + " / " + Intl.NumberFormat().format(max_number);


}