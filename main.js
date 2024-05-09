const row = document.querySelector(".row");
const cols = Array.from(document.querySelectorAll(".col"));
let clickedBoxes = Array(9).fill("");
let currentPlayer = Math.floor(Math.random() * 2) === 0 ? "X" : "O";
let gameEnded = false; // Flag to track game state

function handleClick(event) {
  if (!gameEnded) { // Check if game is still in progress
    const clickedBoxIndex = cols.indexOf(event.target);
    if (clickedBoxes[clickedBoxIndex] === "") {
      clickedBoxes[clickedBoxIndex] = currentPlayer;
      event.target.textContent = currentPlayer;
      checkWinner();
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      if (currentPlayer === "X") {
        computerTurn();
      }
    }
  }
}

function computerTurn() {
  if (!gameEnded) {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * 9);
    } while (clickedBoxes[randomIndex] !== "");

    clickedBoxes[randomIndex] = "X";
    cols[randomIndex].textContent = "X";
    checkWinner();
    currentPlayer = "O";
  }
}

function checkWinner() {
  if (!gameEnded) {
    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    const winner =  document.querySelector("h1");
    for (let condition of winningConditions) {
      const [a, b, c] = condition;
      if (clickedBoxes[a] === clickedBoxes[b] && clickedBoxes[a] !== "" && clickedBoxes[a] === clickedBoxes[c]) {
        // Winner found
        winner.innerHTML =`${clickedBoxes[a]} Wins!`
        gameEnded = true; // Set gameEnded to true
        return;
      }
    }

    // Check for draw (all boxes filled)
    if (clickedBoxes.every(box => box !== "") && !gameEnded) {
      winner.innerHTML = "It's a Draw!"
      gameEnded = true; // Set gameEnded to true
      return;
    }
  }
}

cols.forEach(col => col.addEventListener("click", handleClick));

// Start the game
currentPlayer === "X" ? computerTurn() : null;
