import Pawn from '../components/presentation/pieces/Pawn.jsx';
import Rook from '../components/presentation/pieces/Rook.jsx';
import Knight from '../components/presentation/pieces/Knight.jsx';
import Bishop from '../components/presentation/pieces/Bishop.jsx';
import Queen from '../components/presentation/pieces/Queen.jsx';
import King from '../components/presentation/pieces/King.jsx';
import React from 'react';


export function getPieceAtPosition(pieces, x, y) {
  let piece = {};
  pieces.forEach(p => {
    if (p.position[0] === x && p.position[1] === y && !p.captured) {
      switch(p.type) {
        case 'pawn':
          piece.element = (<Pawn item={p}/>);
          break;
        case 'rook':
          piece.element = (<Rook item={p}/>);
          break;
        case 'knight':
          piece.element = (<Knight item={p}/>);
          break;
        case 'bishop':
          piece.element = (<Bishop item={p}/>);
          break;
        case 'queen':
          piece.element = (<Queen item={p}/>);
          break;
        case 'king':
          piece.element = (<King item={p}/>);
          break;
      }

      piece.item = p;
    }
  });

  return piece;
}
