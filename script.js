// Variabelen
let selectedBlock = null;
let isErasing = false;
let columns = 10;  // Start met 10 kolommen
let rows = 8;      // Start met 8 rijen
const gameArea = document.getElementById("game-area");
const blocks = document.querySelectorAll(".block");
const expandButton = document.getElementById("expandField");
const shrinkButton = document.getElementById("shrinkField");
const eraseButton = document.getElementById("enableEraser");
const resetButton = document.getElementById("resetGame");
const brightnessSlider = document.getElementById("brightness");
const settingsButton = document.getElementById("settingsButton");
const settingsMenu = document.getElementById("settingsMenu");
const closeSettingsButton = document.getElementById("closeSettings");

// Maak cellen aan op basis van het aantal kolommen en rijen
function createCells() {
  gameArea.innerHTML = '';
  for (let i = 0; i < columns * rows; i++) {
    const cell = document.createElement("div");
    cell.classList.add("game-cell");
    gameArea.appendChild(cell);
    cell.addEventListener("click", placeBlock);
  }

  gameArea.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
  gameArea.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
}

// Functie om een blok te plaatsen op de grid
function placeBlock(event) {
  if (isErasing) {
    event.target.style.backgroundColor = ""; // Verwijder blok
  } else if (selectedBlock) {
    event.target.style.backgroundColor = selectedBlock.style.backgroundColor; // Plaats geselecteerd blok
  }
}

// Blok selecteren
blocks.forEach(block => {
  block.addEventListener("click", () => {
    selectedBlock = block;
    blocks.forEach(b => b.classList.remove("selected"));
    block.classList.add("selected");
  });
});

// Vergroot de grond
expandButton.addEventListener("click", () => {
  columns += 2;
  rows += 2;
  createCells();
});

// Verklein de grond
shrinkButton.addEventListener("click", () => {
  if (columns > 2 && rows > 2) {
    columns -= 2;
    rows -= 2;
    createCells();
  }
});

// Activeren van de gumfunctie
eraseButton.addEventListener("click", () => {
  isErasing = !isErasing;
  eraseButton.textContent = isErasing ? "Stop Gum" : "Gum Activeren";
});

// Reset het spel
resetButton.addEventListener("click", () => {
  columns = 10;
  rows = 8;
  createCells();
});

// Helderheid aanpassen
brightnessSlider.addEventListener("input", (e) => {
  gameArea.style.filter = `brightness(${e.target.value}%)`;
});

// Toggle instellingenmenu
settingsButton.addEventListener("click", () => {
  settingsMenu.style.display = settingsMenu.style.display === "block" ? "none" : "block";
});

// Sluit instellingenmenu
closeSettingsButton.addEventListener("click", () => {
  settingsMenu.style.display = "none";
});

// Maak de cellen bij het laden van de pagina
createCells();
