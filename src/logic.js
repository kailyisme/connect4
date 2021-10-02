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
    if (
      boardMatrix[pos[0]][pos[1]].querySelector(".playing-piece") &&
      boardMatrix[pos[0]][pos[1]]
        .querySelector(".playing-piece")
        .src.match(new RegExp(turn))
    ) {
      consecutiveChips++;
    } else consecutiveChips = 0;
    if (consecutiveChips === 4) return true;
  }
  return false;
}

function checkWinner(origPos, turn, boardMatrix) {
  console.log(`Checking winner from position: ${origPos}`);
  const arraysToCheck = possibleWinningCoords(origPos);
  for (const arrayToCheck of arraysToCheck) {
    if (checkIf4ConsecutiveInLine(turn, arrayToCheck, boardMatrix)) return true;
  }
  return false;
}

export { takeTurn, swapTurns, checkWinner };
