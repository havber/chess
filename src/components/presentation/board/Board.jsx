import React from 'react';
import Square from './Square.jsx';
import {DragDropContext} from 'react-dnd';
import HTMLBackend from 'react-dnd-html5-backend';
import {connect} from "react-redux";
import DragLayer from '../pieces/Previews/CustomDragLayer.jsx';
import {getPieceAtPosition} from '../../../helpers/piece';
import {calcLegalMoves} from '../../../helpers/legalMoves';

const mapStateToProps = (state) => {
  return {
    numberOfMoves: state.numberOfMoves,
    squares: state.squares,
    pieces: state.pieces,
  }
};

class Board extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      legalMoves: [],
    }
  }

  onSquareSelected() {
    const square = Array.prototype.slice.call(arguments)[0];
    this.props.dispatch({
      type: 'SELECT_SQUARE',
      data: square,
    });

    const piece = getPieceAtPosition(this.props.pieces, square.position.x, square.position.y);
    this.setState({
      legalMoves: calcLegalMoves(piece.item, square, this.props.squares)
    });
  }

  renderSquare(square, index) {
    const x = square.position.x;
    const y = square.position.y;
    let cls = (x + y) % 2 === 0 ? 'dark' : 'light';

    this.state.legalMoves.forEach(s => {
      if (square.position.x === s.position.x && square.position.y === s.position.y) {
        cls += ' legal';
      }
    });

    return (
      <div key={index} className={'square ' + cls} style={{ width: '12.5%', height: '12.5%' }}>
        <Square className={cls} x={x} y={y} isOver={false} square={square} onClick={this.onSquareSelected.bind(this, square)}/>
      </div>
    )
  }

  render() {
    const squares = [];
    this.props.squares.forEach((square, index) => {
      squares.push(this.renderSquare(square, index));
    });
    return (
      <div>
        <div className="board">{squares}</div>
        <DragLayer/>
      </div>
    );
  }
}

const ChessBoard = connect(
  mapStateToProps
)(Board);

export default DragDropContext(HTMLBackend)(ChessBoard);
