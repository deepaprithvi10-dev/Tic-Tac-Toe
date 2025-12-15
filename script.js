const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

const gameScreen = document.getElementById("gameScreen");
const resultScreen = document.getElementById("resultScreen");
const resultText = document.getElementById("resultText");
const playAgainBtn = document.getElementById("playAgainBtn");

let currentPlayer = "X";
let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];

const winningCombinations = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
playAgainBtn.addEventListener("click", restartGame);

function handleCellClick(e) {
  const index = e.target.dataset.index;

  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add("disabled");

  checkResult();
}

function checkResult() {
  for (let combo of winningCombinations) {
    const [a,b,c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      showResult(`🎉 Player ${currentPlayer} Wins!`);
      return;
    }
  }

  if (!board.includes("")) {
    showResult("🤝 It's a Draw!");
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function showResult(message) {
  gameActive = false;
  resultText.textContent = message;
  gameScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;

  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("disabled");
  });

  statusText.textContent = "Player X's turn";
  resultScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
}