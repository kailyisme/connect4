import {
  amountOfColumns,
  amountOfRows,
  bluePiece,
  inline4RelativeCoordinates,
  yellowPiece,
} from "./constants.js";
import { buildSeqArray, reverseArray } from "./utils.js";

function takeTurn(boardMatrix, columnIndex, turn) {
  let toReturnMessage = { message: "Cannot place a chip in a full column" };
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
      toReturnMessage = { message: "success", result: [[columnIndex], [rowIndex]] };
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

function mapRelativeCoordinatesToPosition(originalPosition, arrayToMap) {
  let toReturn = arrayToMap.map((relativePosition) => {
    const columnIndex = +originalPosition[0] + relativePosition[0];
    const rowIndex = +originalPosition[1] + relativePosition[1];
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

function possibleWinningCoordinates(originalPosition) {
  const toReturn = [];
  for (const winningDirectionKey in inline4RelativeCoordinates) {
    const newWinningArray = mapRelativeCoordinatesToPosition(
      originalPosition,
      inline4RelativeCoordinates[winningDirectionKey]
    );
    if (newWinningArray.length > 3) toReturn.push(newWinningArray);
  }
  return toReturn;
}

function checkIf4ConsecutiveInLine(turn, arrayToCheck, boardMatrix) {
  let consecutiveChips = 0;
  for (const position of arrayToCheck) {
    if (
      boardMatrix[position[0]][position[1]].querySelector(".playing-piece") &&
      boardMatrix[position[0]][position[1]]
        .querySelector(".playing-piece")
        .src.match(new RegExp(turn))
    ) {
      consecutiveChips++;
    } else consecutiveChips = 0;
    if (consecutiveChips === 4) return true;
  }
  return false;
}

function checkWinner(originalPosition, turn, boardMatrix) {
  console.log(`Checking winner from position: ${originalPosition}`);
  const arraysToCheck = possibleWinningCoordinates(originalPosition);
  for (const arrayToCheck of arraysToCheck) {
    if (checkIf4ConsecutiveInLine(turn, arrayToCheck, boardMatrix)) return true;
  }
  return false;
}

export { takeTurn, swapTurns, checkWinner };
