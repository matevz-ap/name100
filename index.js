const wikiUrl = "https://en.wikipedia.org/wiki/";
let startTime;
let running = false;
let amount = 100;

function startStop() {
    if (!running) {
        startTime = new Date().getTime();
        running = true;
        update();
    } else {
        running = false;
    }
}

function update() {
    if (running) {
        let currentTime = new Date().getTime();
        let elapsedTime = new Date(currentTime - startTime);
        let hours = elapsedTime.getUTCHours().toString().padStart(2, '0');
        let minutes = elapsedTime.getUTCMinutes().toString().padStart(2, '0');
        let seconds = elapsedTime.getUTCSeconds().toString().padStart(2, '0');
        let miliseconds = elapsedTime.getUTCMilliseconds().toString();
        document.getElementById("display").textContent = hours + ":" + minutes + ":" + seconds + ":" + miliseconds;
        setTimeout(update, 10);
    }
}

function reset() {
    running = false;
    document.getElementById("display").textContent = "00:00:00:000";
}

async function isValid(name) {
    let response = await fetch(wikiUrl + name, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.status === 200;
}

function addGuess(name) {
    const guesess = document.getElementById('guesses');
    let new_guess = document.createElement("div");
    new_guess.classList = 'mb-4 border p-3 rounded-lg bg-secondary text-lg';
    new_guess.innerHTML = name; 
    new_guess.id = amount;
    guesess.appendChild(new_guess);
}

document.getElementById('input-form').addEventListener('submit', function() {
    event.preventDefault();
    var input = document.getElementById('name');

    const guesess = document.getElementById('guesses');
    if (guesess.childElementCount < 1) {
        startStop();
    } else if (guesess.childElementCount >= 5) {
        running = false;
    }
    
    addGuess(input.value);
    input.value = '';

    amount--;
    document.getElementById('amount').innerHTML = amount;

    isValid(input.value).then((valid) => {
        if (valid) {
            document.getElementById(amount).classList.add('border-green-200');
        } else {
            document.getElementById(amount).classList.add('border-red-200');
        }
    });
}); 

document.getElementById('reset').addEventListener('click', function() {
    reset();
    const guesess = document.getElementById('guesses');
    guesess.innerHTML = '';
    amount = 100;
    document.getElementById('amount').innerHTML = amount;
});