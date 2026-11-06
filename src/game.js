// Adjust these two if your images live somewhere else or use a different file type
const IMG_FOLDER = `${import.meta.env.BASE_URL}artwork/images/`;
const EXT = ".png";

const imagePairLetters = ["a", "b", "c", "d", "e", "f", "g", "h"];
import { burstConfetti } from "./confetti.js";

const rowLayout = [
  { cards: 4, gapAfterIndex: 1 },
  { cards: 6 },
  { cards: 4 },
  { cards: 2 },
];

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Build the full 16-card deck
const cardDescriptors = [];

imagePairLetters.forEach((letter) => {
  cardDescriptors.push({
    pairId: letter,
    type: "image",
    src: `${IMG_FOLDER}${letter}1${EXT}`,
  });
  cardDescriptors.push({
    pairId: letter,
    type: "image",
    src: `${IMG_FOLDER}${letter}2${EXT}`,
  });
});

const deck = shuffle(cardDescriptors);

const grid = document.getElementById("game-grid");
const winMessage = document.getElementById("win-message");

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedCount = 0;
let deckIndex = 0;

rowLayout.forEach((row) => {
  const rowEl = document.createElement("div");
  rowEl.className = "card-row";

  for (let i = 0; i < row.cards; i++) {
    const data = deck[deckIndex];
    deckIndex++;

    const card = document.createElement("div");
    card.className = "card";
    card.dataset.pairId = data.pairId;

    const faceContent =
      data.type === "image"
        ? `<img src="${data.src}" alt="" class="card-face-img" />`
        : data.symbol;

    card.innerHTML = `
        <div class="card-inner">
        <div class="card-cover"><img src="${import.meta.env.BASE_URL}artwork/eggy2.png" alt="" class="card-cover-img" /></div>
        <div class="card-face">${faceContent}</div>
    </div>

    `

    card.addEventListener("click", () => handleCardClick(card));
    rowEl.appendChild(card);

    if (row.gapAfterIndex === i) {
      const spacer = document.createElement("div");
      spacer.className = "card-spacer";
      rowEl.appendChild(spacer);
    }
  }

  grid.appendChild(rowEl);
});

function handleCardClick(card) {
  if (lockBoard) return;
  if (card === firstCard) return;
  if (card.classList.contains("matched")) return;

  card.classList.add("flipped");

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;
  lockBoard = true;

  const isMatch = firstCard.dataset.pairId === secondCard.dataset.pairId;

  if (isMatch) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    matchedCount += 2;
    resetTurn();

    if (matchedCount === deck.length) {
  setTimeout(() => {
    winMessage.classList.add("visible");
    document.getElementById("home-button").classList.add("visible");
    launchWinConfetti();
  }, 400);
}
  } else {
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      resetTurn();
    }, 900);
  }
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

function launchWinConfetti() {
  const bursts = 6;
  for (let i = 0; i < bursts; i++) {
    setTimeout(() => {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * (window.innerHeight * 0.5);
      burstConfetti(x, y);
    }, i * 200);
  }
}