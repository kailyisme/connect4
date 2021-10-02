import {
  amountOfColumns,
  amountOfRows,
  bluePiece,
  inline4RelativeCoordinates,
  yellowPiece,
} from "./constants.js";
import { buildSeqArray, reverseArray } from "./utils.js";

function takeTurn(boardMatrix, columnIndex, turn) {
  let toReturnMessage = { msg: "Cannot place a chip in a full column" };
  for (const rowIndex of reverseArray(
    buildSeqArray(boardMatrix[columnIndex].length)
  )) {
    if (!boardMatrix[columnIndex][rowIndex].querySelector(".playing-piece")) {
      const newPlay = document.createElement("img");
      if (turn === "yellow") {
        newPlay.src = yellowPiece;
      } else newPlay.src = bluePiece;
      newPlay.classList.add("playing-piece");
      boardMatrix[columnIndex][rowIndex].appendChild(newPlay);
      toReturnMessage = { msg: "success", result: [[columnIndex], [rowIndex]] };
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

function mapRelCoordsToPos(origPos, arrayToMap) {
  let toReturn = arrayToMap.map((relativePos) => {
    const columnIndex = +origPos[0] + relativePos[0];
    const rowIndex = +origPos[1] + relativePos[1];
    if (
      rowIndex >= 0 &&
      rowIndex < amountOfRows &&
      columnIndex >= 0 &&
      columnIndex < amountOfColumns
    ) {
      return [columnIndex, rowIndex];
    }
  });
  toReturn = toReturn.filter((entry) => typeof entry !== "undefined");
  return toReturn;
}

function possibleWinningCoords(origPos) {
  const toReturn = [];
  for (const inlineKey in inline4RelativeCoordinates) {
    const newWinningArray = mapRelCoordsToPos(
      origPos,
      inline4RelativeCoordinates[inlineKey]
    );
    if (newWinningArray.length > 3) toReturn.push(newWinningArray);
  }
  return toReturn;
}

function checkIf4ConsecutiveInLine(turn, arrayToCheck, boardMatrix) {
  let consecutiveChips = 0;
  for (const pos of arrayToCheck) {
    console.log(`pos: ${pos}`);
    if (boardMatrix[pos[0]][pos[1]].querySelector(".playing-piece")) {
      if (
        boardMatrix[pos[0]][pos[1]]
          .querySelector(".playing-piece")
          .src.match(new RegExp(turn))
      )
        console.log(
          boardMatrix[pos[0]][pos[1]]
            .querySelector(".playing-piece")
            .src.match(new RegExp(turn))[0]
        );
    }
  }
}

function checkWinner(origPos, turn, boardMatrix) {
  console.log(`Checking winner from position: ${origPos}`);
  const arraysToCheck = possibleWinningCoords(origPos);
  // console.log(arraysToCheck);
  checkIf4ConsecutiveInLine(turn, arraysToCheck[0], boardMatrix);
  return false;
}
// Extract winning arrays from position played
// extract coordinates for each of the positions
// extract positions for coordinates
// TODO check if 4 inline in a given array
// TODO checkwinner func

export { takeTurn, swapTurns, checkWinner };
