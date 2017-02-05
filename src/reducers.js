import { initialState } from './initialState.js';

export function chessGame(state, action) {

  const newState = Object.assign({}, state);
  switch (action.type) {
    case 'MOVE_PAWN':
    case 'MOVE_ROOK':
    case 'MOVE_KNIGHT':
    case 'MOVE_BISHOP':
    case 'MOVE_QUEEN':
    case 'MOVE_KING':
      const index = state.pieces.findIndex(({id}) => id === action.data.id);
      const newPiecesArray = [...state.pieces.slice(0, index),
        {
          ...state.pieces[index],
          ['position']: action.data.position
        },
        ...state.pieces.slice(index + 1)
      ];
      return {
        ...state,
        pieces: newPiecesArray,
        numberOfMoves: newState.numberOfMoves + 1
      };
    default:
      console.log('STATE');
      return state;
  }
}
