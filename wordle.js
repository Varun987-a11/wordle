/*
  Refined wordle.js
  - Proper input handling (letters, backspace, enter)
  - Duplicate-letter handling (correct/present/absent)
  - Friendly messages and accessible aria-live
  - New Game button reloads
*/

/* ------------------ Configuration ------------------ */
const HEIGHT = 6;
const WIDTH = 5;

/* ------------------ Word list ------------------ */
/* For brevity I include a modest sample below.
   Replace / extend this array with your full list if desired. */
const words = [
  "cigar","rebut","sissy","humph","awake","blush","focal","evade","naval","serve",
  "heath","dwarf","model","karma","stink","grade","quiet","bench","abate","feign",
  "major","death","fresh","crust","stool","colon","abase","marry","react","batty",
  "pride","floss","helix","croak","staff","paper","unfed","whelp","trawl","outdo",
  "adobe","crazy","sower","repay","digit","crate","click","great","world","bring",
  "solve","heart","apple","about","there","hello","train","watch","green","apple"
];
/* If you want the original long list, paste it here (all lower-case). */

/* ------------------ Game state ------------------ */
let boardElement = document.getElementById("board");
let answerElement = document.getElementById("answer");
let reloadButton = document.getElementById("reloadButton");

let row = 0;
let col = 0;
let gameOver = false;
let secret = getRandomWord();

/* Build board */
function initialize() {
  boardElement.innerHTML = "";
  answerElement.textContent = "";
  for (let r = 0; r < HEIGHT; r++) {
    for (let c = 0; c < WIDTH; c++) {
      const span = document.createElement("span");
      span.id = `${r}-${c}`;
      span.className = "tile";
      span.textContent = "";
      boardElement.appendChild(span);
    }
  }
  reloadButton.classList.add("hidden");
  row = 0;
  col = 0;
  gameOver = false;
}

/* Choose random word */
function getRandomWord() {
  const i = Math.floor(Math.random() * words.length);
  return words[i].toLowerCase();
}

/* Show a short message in the answer box (aria-live will announce) */
function showMessage(msg) {
  answerElement.textContent = msg;
}

/* Add a letter to current tile */
function addLetter(letter) {
  if (gameOver) return;
  if (col >= WIDTH) return;
  const tile = document.getElementById(`${row}-${col}`);
  tile.textContent = letter.toUpperCase();
  col++;
}

/* Remove last letter */
function removeLetter() {
  if (gameOver) return;
  if (col === 0) return;
  col--;
  const tile = document.getElementById(`${row}-${col}`);
  tile.textContent = "";
}

/* Submit current row as guess */
function submitGuess() {
  if (gameOver) return;
  if (col !== WIDTH) {
    showMessage("Complete the word (5 letters) before submitting.");
    return;
  }

  // Build guess
  let guess = "";
  for (let c = 0; c < WIDTH; c++) {
    guess += document.getElementById(`${row}-${c}`).textContent.toLowerCase();
  }

  if (!/^[a-z]{5}$/.test(guess)) {
    showMessage("Guess must be alphabetic 5 letters.");
    return;
  }

  if (!words.includes(guess)) {
    showMessage("Not a valid word (not in dictionary).");
    return;
  }

  // Evaluate guess with two-pass approach to handle duplicates properly
  const target = secret.split("");
  const guessArr = guess.split("");
  const result = new Array(WIDTH).fill("absent");

  // First pass: correct letters
  for (let i = 0; i < WIDTH; i++) {
    if (guessArr[i] === target[i]) {
      result[i] = "correct";
      target[i] = null; // consume letter
    }
  }

  // Second pass: present but wrong position
  for (let i = 0; i < WIDTH; i++) {
    if (result[i] === "correct") continue;
    const idx = target.indexOf(guessArr[i]);
    if (idx !== -1) {
      result[i] = "present";
      target[idx] = null; // consume that letter
    }
  }

  // Apply classes to tiles
  for (let i = 0; i < WIDTH; i++) {
    const tile = document.getElementById(`${row}-${i}`);
    tile.classList.add(result[i]);
  }

  // Check win
  if (result.every(r => r === "correct")) {
    showMessage("Congratulations! You guessed the word!");
    endGame(true);
    return;
  }

  // Move to next row or end game if out of rows
  row++;
  col = 0;

  if (row >= HEIGHT) {
    showMessage(`Out of tries — the word was: ${secret.toUpperCase()}`);
    endGame(false);
  } else {
    showMessage(""); // clear temporary messages
  }
}

/* End game: reveal reload button */
function endGame(won) {
  gameOver = true;
  reloadButton.classList.remove("hidden");
}

/* New game handler */
function newGame() {
  secret = getRandomWord();
  initialize();
}

/* Keyboard events */
document.addEventListener("keydown", (e) => {
  if (gameOver && e.key !== "Enter") return;

  const key = e.key;

  if (key === "Backspace") {
    removeLetter();
    return;
  }

  if (key === "Enter") {
    submitGuess();
    return;
  }

  // letter keys a-z
  if (/^[a-zA-Z]$/.test(key)) {
    addLetter(key.toLowerCase());
  }
});

/* Touch / focus: ensure board exists before init */
window.addEventListener("load", () => {
  boardElement = document.getElementById("board");
  answerElement = document.getElementById("answer");
  reloadButton = document.getElementById("reloadButton");
  reloadButton.addEventListener("click", () => {
    // small delay to ensure the user sees the click feedback
    setTimeout(newGame, 80);
  });
  initialize();
  console.log("Secret word (debug):", secret);
});
