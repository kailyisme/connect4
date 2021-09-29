import * as logic from "./src/logic.js";

const topLevel = document.querySelector("body");
const title = document.createElement("div");
title.classList.add("title");
topLevel.appendChild(title);
const canvas = document.createElement("div");
canvas.classList.add("canvas");
topLevel.appendChild(canvas);

const boardPieceImg = "./assets/board_piece.svg";
const bluePiece = "./assets/blue_piece_alt.svg";
const yellowPiece = "./assets/yellow_piece_alt.svg";

const boardMatrix = [];

const possibleMoves = ["blue", "yellow"];
let turn = possibleMoves[Math.round(Math.random())];

// Title Assemble
const titleHeading = document.createElement("h1");
titleHeading.innerText = "Connect 4";
title.appendChild(titleHeading);
const notification = document.createElement("p");
title.appendChild(notification);
function updateTurnNotification(msg) {
  console.log(msg);
  if (msg) {
    notification.innerText = msg;
  } else notification.innerText = `It is ${turn}'s turn`;
}
updateTurnNotification();

// Board building
for (const col in Array.from({ length: 7 })) {
  const columnDiv = document.createElement("div");
  const columnArray = [];
  columnDiv.classList.add("column");
  for (const row in Array.from({ length: 6 })) {
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
    const error = logic.takeTurn(boardMatrix, columnIndex, turn);
    if (error === "success") {
      turn = logic.swapTurns(possibleMoves, turn);
      updateTurnNotification();
    } else updateTurnNotification(error);
  };
}

canvas.querySelectorAll(".column").forEach((column, columnIndex) => {
  column.addEventListener("click", onColumnClickTakeTurn(columnIndex));
});
