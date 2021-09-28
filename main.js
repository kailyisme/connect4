import * as logic from "./src/logic.js";

const topLevel = document.querySelector("body");
const canvas = document.createElement("div");

const boardPieceImg = "./assets/board_piece.svg";
const bluePiece = "./assets/blue_piece_alt.svg";
const yellowPiece = "./assets/yellow_piece_alt.svg";

const boardMatrix = [];

const possibleMoves = ["blue", "yellow"];
let turn = possibleMoves[Math.round(Math.random())];

// Board building
canvas.classList.add("canvas");
topLevel.appendChild(canvas);
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

// Board Spacing testing
// for (const col in boardMatrix) {
//   for (const row in boardMatrix[col]) {
//     const newPlay = document.createElement("img");
//     newPlay.src = yellowPiece;
//     newPlay.classList.add("playing-piece");
//     boardMatrix[col][row].appendChild(newPlay);
//   }
// }

// Attach click event listener to each column
function addClickEventListenerToColumnIndex(columnIndex, callBackFunc) {
  return function (event) {
    callBackFunc(event, columnIndex);
  };
}

function onColumnClickTakeTurn(event, columnIndex) {
  logic.takeTurn(boardMatrix, columnIndex, turn);
}

canvas.querySelectorAll(".column").forEach((column, columnIndex) => {
  column.addEventListener("click", (e) => {
    console.log(`Taking turn on column number: ${columnIndex}`);
    console.log(boardMatrix[columnIndex][5]);
    logic.takeTurn(boardMatrix, columnIndex, turn);
    turn = logic.swapTurns(possibleMoves, turn);
  });
});

// logic.takeTurn(boardMatrix, 0, "blue");
