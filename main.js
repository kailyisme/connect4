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

// Title Assemble
const titleHeading = document.createElement("h1");
titleHeading.innerText = "Connect 4";
title.appendChild(titleHeading);
const notification = document.createElement("p");
title.appendChild(notification);
function updateTurnNotification(msg) {
  if (msg) {
    notification.innerText = msg;
  } else notification.innerText = `It is ${turn}'s turn`;
}

// Init
const boardMatrix = [];
let turn = possibleMoves[Math.round(Math.random())];
updateTurnNotification();

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
    console.log(`Taking turn on column number: ${columnIndex}`);
    const turnResult = logic.takeTurn(boardMatrix, columnIndex, turn);
    if (turnResult.msg === "success") {
      if (logic.checkWinner(turnResult.result, turn, boardMatrix)) {
        updateTurnNotification(`${utils.title(turn)}'s is the winner`);
      } else {
        turn = logic.swapTurns(possibleMoves, turn);
        updateTurnNotification();
      }
    } else updateTurnNotification(turnResult.msg);
  };
}

canvas.querySelectorAll(".column").forEach((column, columnIndex) => {
  column.addEventListener("click", onColumnClickTakeTurn(columnIndex));
});
