let level = 1;
let points = 0;
let maxClicks = 5;
let clicksLeft = maxClicks;
let treasureIndex = 0;
let totalChests = 4;  // Start with 4 chests for horizontal layout
let gameOver = false;

window.onload = () => {
    initializeGame();
};

// Initialize or reset the game
function initializeGame() {
    treasureIndex = Math.floor(Math.random() * totalChests);
    clicksLeft = maxClicks;
    gameOver = false;

    // Update UI
    document.getElementById('level').innerText = level;
    document.getElementById('points').innerText = points;
    document.getElementById('clicks-left').innerText = clicksLeft;
    document.getElementById('message').innerText = '';

    // Generate chests
    const grid = document.getElementById('grid');
    grid.innerHTML = ''; // Clear old chests
    for (let i = 0; i < totalChests; i++) {
        const chest = document.createElement('div');
        chest.classList.add('chest');
        chest.setAttribute('data-index', i);
        chest.addEventListener('click', checkTreasure);
        grid.appendChild(chest);
    }
}

// Check if the clicked chest is the treasure chest
function checkTreasure(event) {
    if (gameOver) return;

    const index = event.target.getAttribute('data-index');
    clicksLeft--;
    document.getElementById('clicks-left').innerText = clicksLeft;

    if (index == treasureIndex) {
        event.target.classList.add('opened');
        event.target.innerHTML = '💎';
        displayMessage("You found the treasure!");
        points++;
        document.getElementById('points').innerText = points;
        nextLevel();
    } else {
        event.target.classList.add('opened');
        event.target.innerHTML = '❌';
        if (clicksLeft === 0) {
            gameOver = true;
            displayMessage("Game Over! Try again.");
        }
    }
}

// Move to the next level
function nextLevel() {
    gameOver = true;
    setTimeout(() => {
        level++;
        totalChests += 2; // Add 2 more chests with each level for gradual difficulty
        initializeGame();
    }, 1000);
}

// Display a message to the player
function displayMessage(msg) {
    const message = document.getElementById('message');
    message.innerText = msg;
}

// Reset the game to level 1
function resetGame() {
    level = 1;
    points = 0;
    totalChests = 4; // Reset to the initial number of chests
    initializeGame();
}
