import { initialState } from './initialState.js';

const updatePiecesArray = (state, data) => {
  let newArray = [...state.pieces];
  newArray.forEach(piece => {
    if (piece.id === data.id) {
      piece.position = data.position;
    }
  });
  return newArray;
};

export function chessGame(state = initialState, action) {

  switch (action.type) {
    case 'MOVE_PAWN':
    case 'MOVE_ROOK':
    case 'MOVE_KNIGHT':
    case 'MOVE_BISHOP':
    case 'MOVE_QUEEN':
    case 'MOVE_KING':
      return {
        ...state,
        pieces: updatePiecesArray(state, action.data),
      };
    default:
      return state;
  }
}
