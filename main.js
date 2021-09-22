const topLevel = document.querySelector("body");
const canvas = document.createElement("div");

const boardPieceImg = "./assets/board_piece.svg";
const bluePiece = "./assets/blue_piece_alt.svg";
const yellowPiece = "./assets/yellow_piece_alt.svg";

const boardArray = [];

canvas.classList.add("canvas");
topLevel.appendChild(canvas);
for (col in Array.from({ length: 7 })) {
  const columnDiv = document.createElement("div");
  const columnArray = [];
  columnDiv.classList.add("column");
  for (row in Array.from({ length: 6 })) {
    const newBoardPosition = document.createElement("div");
    columnArray.push(newBoardPosition);
    newBoardPosition.classList.add("board-position");
    const boardPiece = document.createElement("img");
    boardPiece.src = boardPieceImg;
    boardPiece.classList.add("board-piece");
    newBoardPosition.appendChild(boardPiece);
    columnDiv.appendChild(newBoardPosition);
  }
  boardArray.push(columnArray);
  canvas.appendChild(columnDiv);
}

const newPlay = document.createElement("img");
newPlay.src = bluePiece;
newPlay.classList.add("playing-piece");
boardArray[0][0].appendChild(newPlay);
