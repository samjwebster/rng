let numberDisplay = document.getElementById("random_number");
let knownNumbers = new Set();

let max_number = 40000000;

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