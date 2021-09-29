const bluePiece = "../assets/blue_piece_alt.svg";
const yellowPiece = "../assets/yellow_piece_alt.svg";

function takeTurn(boardMatrix, columnIndex, turn) {
  let toReturnMessage = "Cannot place a chip in a full column";
  for (const rowIndex of Array.from({ length: 6 }).map(
    (_, index) => 5 - index
  )) {
    if (!boardMatrix[columnIndex][rowIndex].querySelector(".playing-piece")) {
      const newPlay = document.createElement("img");
      if (turn === "yellow") {
        newPlay.src = yellowPiece;
      } else newPlay.src = bluePiece;
      newPlay.classList.add("playing-piece");
      boardMatrix[columnIndex][rowIndex].appendChild(newPlay);
      toReturnMessage = "success";
      break;
    }
  }
  return toReturnMessage;
}

function swapTurns(possibleMoves, turn) {
  if (turn === possibleMoves[0]) {
    return possibleMoves[1];
  } else return possibleMoves[0];
}

export { takeTurn, swapTurns };
