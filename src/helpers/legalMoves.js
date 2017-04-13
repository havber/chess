"use strict";

function _getSquareAtIndex(squares, x, y) {
  const squareIndex = squares.findIndex((s) => {
    return s.position.x === x && s.position.y === y;
  });
  return squares[squareIndex];
}

function _legalPawnMoves(piece, square, squares) {

  let legalMoves = [];
  let potentialSquare;
  const x = square.position.x;
  const y = square.position.y;
  const squareIndex = squares.findIndex((s) => {
    return s.position.x === square.position.x && s.position.y === square.position.y;
  });
  const squareAtIndex = squares[squareIndex];

  if(square.position.y === 1 && piece.color === 'white') {
    potentialSquare = _getSquareAtIndex(squares, x, y + 1);
    if(!potentialSquare.occupied) {
      legalMoves.push(potentialSquare);
    }

    potentialSquare = _getSquareAtIndex(squares, x, y + 2);
    if(!potentialSquare.occupied) {
      legalMoves.push(potentialSquare);
    }
  }

  return legalMoves;
}

export function calcLegalMoves(piece, square, squares) {

  switch (piece.type) {
    case 'pawn':
      console.log(piece, squares);
      return _legalPawnMoves(piece, square, squares);
      break;
  }


}
