import * as logic from "./src/logic.js";
import * as utils from "./src/utils.js";
import {
  boardPieceImg,
  amountOfColumns,
  amountOfRows,
  possibleMoves,
} from "./src/constants.js";

const topLevel = document.querySelector("body");
const title = document.createElement("div");
title.classList.add("title");
topLevel.appendChild(title);
const canvas = document.createElement("div");
canvas.classList.add("canvas");
topLevel.appendChild(canvas);

// Title Assembly
const titleHeading = document.createElement("h1");
titleHeading.innerText = "Connect 4";
title.appendChild(titleHeading);
const notification = document.createElement("p");
title.appendChild(notification);
function updateTurnNotification(message) {
  if (message) {
    notification.innerText = message;
  } else notification.innerText = `It is ${turn}'s turn`;
}

// Init
const boardMatrix = [];
let turn = possibleMoves[Math.round(Math.random())];
updateTurnNotification();
let gameFinished = false;

// Board building
for (const col in Array.from({ length: amountOfColumns })) {
  const columnDiv = document.createElement("div");
  const columnArray = [];
  columnDiv.classList.add("column");
  for (const row in Array.from({ length: amountOfRows })) {
    const newBoardPosition = document.createElement("div");
    columnArray.push(newBoardPosition);
    newBoardPosition.classList.add("board-position");
    const boardPiece = document.createElement("img");
    boardPiece.src = boardPieceImg;
    boardPiece.classList.add("board-piece");
    newBoardPosition.appendChild(boardPiece);
    columnDiv.appendChild(newBoardPosition);
  }
  boardMatrix.push(columnArray);
  canvas.appendChild(columnDiv);
}

// Attach click event listener to each column
function onColumnClickTakeTurn(columnIndex) {
  return function (event) {
    if (gameFinished) {
      updateTurnNotification("Game has finished. Please reload page.");
    } else {
      console.log(`Taking turn on column number: ${columnIndex}`);
      const turnResult = logic.takeTurn(boardMatrix, columnIndex, turn);
      if (turnResult.message === "success") {
        if (logic.checkWinner(turnResult.result, turn, boardMatrix)) {
          updateTurnNotification(`${utils.title(turn)}'s is the winner`);
          gameFinished = true;
        } else {
          turn = logic.swapTurns(possibleMoves, turn);
          updateTurnNotification();
        }
      } else updateTurnNotification(turnResult.message);
    }
  };
}

canvas.querySelectorAll(".column").forEach((column, columnIndex) => {
  column.addEventListener("click", onColumnClickTakeTurn(columnIndex));
});
