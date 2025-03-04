const images = [
    "images/img1.jpeg",
    "images/img2.jpeg",
    "images/img3.jpeg",
    "images/img4.jpeg",
    "images/img5.jpeg",
    "images/img6.jpeg",
    "images/img7.jpeg",
    "images/img8.jpeg",
    "images/img1.jpeg",
    "images/img2.jpeg",
    "images/img3.jpeg",
    "images/img4.jpeg",
    "images/img5.jpeg",
    "images/img6.jpeg",
    "images/img7.jpeg",
    "images/img8.jpeg"
];

let shuffledImages;
let selectedCards = [];
let matchedCards = 0;
let lives = 5;
let timer = 120; // 2 minutes en secondes
let timerInterval;
const gameBoard = document.getElementById("game-board");
const restartBtn = document.getElementById("restart-btn");
const validateBtn = document.getElementById("validate-btn");
const timerDisplay = document.getElementById("timer");
const livesDisplay = document.getElementById("lives");

function initializeGame() {
    // Réinitialisation des éléments du jeu
    gameBoard.innerHTML = "";
    shuffledImages = images.sort(() => 0.5 - Math.random());
    matchedCards = 0;
    selectedCards = [];
    lives = 5;
    timer = 120; // 2 minutes
    livesDisplay.textContent = `Vies: ${lives}`;
    timerDisplay.textContent = "02:00";

    // Créer les cartes
    shuffledImages.forEach((image) => {
        let card = document.createElement("div");
        card.classList.add("card", "hidden");
        let img = document.createElement("img");
        img.src = image;
        card.appendChild(img);
        card.addEventListener("click", () => flipCard(card));
        gameBoard.appendChild(card);
    });

    // Réinitialiser le timer
    clearInterval(timerInterval);
}

function startTimer() {
    clearInterval(timerInterval); // Évite d'avoir plusieurs timers en parallèle
    timerInterval = setInterval(() => {
        if (timer > 0) {
            timer--;
            const minutes = Math.floor(timer / 60);
            const seconds = timer % 60;
            timerDisplay.textContent = `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
        } else {
            // Si le temps est écoulé, on redémarre le jeu
            clearInterval(timerInterval);
            alert("Temps écoulé ! Le jeu recommence.");
            restartGame();
        }
    }, 1000);
}

function flipCard(card) {
    // Démarre le timer dès le premier clic sur une carte
    if (!timerInterval) {
        startTimer();
    }

    if (selectedCards.length < 2 && card.classList.contains("hidden")) {
        card.classList.remove("hidden");
        card.classList.add("revealed");
        selectedCards.push(card);
        if (selectedCards.length === 2) {
            setTimeout(checkMatch, 500);
        }
    }
}

validateBtn.addEventListener("click", () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    timeElapsedDisplay.textContent = `Temps écoulé: ${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
});

function checkMatch() {
    if (selectedCards[0].firstChild.src === selectedCards[1].firstChild.src) {
        matchedCards += 2;
        if (matchedCards === images.length) {
            clearInterval(timerInterval);
            alert("Bravo ! Vous avez gagné !");
            restartGame();
        }
    } else {
        selectedCards.forEach((card) => {
            card.classList.add("hidden");
            card.classList.remove("revealed");
        });
        // Perdre une vie
        lives--;
        livesDisplay.textContent = `Vies: ${lives}`;
        if (lives <= 0) {
            clearInterval(timerInterval);
            alert("Tu as perdu toutes tes vies ! Le jeu recommence.");
            restartGame();
        }
    }
    selectedCards = [];
}

function restartGame() {
    initializeGame();
    startTimer(); // Redémarrer le timer à chaque fois qu'on recommence
}

// Boutons
restartBtn.addEventListener("click", restartGame);
validateBtn.addEventListener("click", () => alert("Partie validée !"));

// Initialisation du jeu au chargement
initializeGame();
