const boardPieceImg = "./assets/board_piece.svg";
const bluePiece = "./assets/blue_piece_alt.svg";
const yellowPiece = "./assets/yellow_piece_alt.svg";

const amountOfColumns = 7;
const amountOfRows = 6;
const possibleMoves = ["blue", "yellow"];

const inline4RelativeCoordinates = {
  vertical: [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
  ],
  horizontal: [
    [-3, 0],
    [-2, 0],
    [-1, 0],
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
  ],
  diagonalUp: [
    [-3, 3],
    [-2, 2],
    [-1, 1],
    [0, 0],
    [1, -1],
    [2, -2],
    [3, -3],
  ],
  diagonalDown: [
    [-3, -3],
    [-2, -2],
    [-1, -1],
    [0, 0],
    [1, 1],
    [2, 2],
    [3, 3],
  ],
};

export {
  boardPieceImg,
  bluePiece,
  yellowPiece,
  amountOfColumns,
  amountOfRows,
  possibleMoves,
  inline4RelativeCoordinates,
};
