import React from 'react';
import Square from './Square.jsx';
import {DragDropContext} from 'react-dnd';
import HTMLBackend from 'react-dnd-html5-backend';
import {connect} from "react-redux";
import DragLayer from '../pieces/Previews/CustomDragLayer.jsx';

const mapStateToProps = (state) => {
  return {
    numberOfMoves: state.numberOfMoves,
    squares: state.squares,
  }
};

class Board extends React.Component {

  onSquareSelected() {
    const square = Array.prototype.slice.call(arguments)[0];
    this.props.dispatch({
      type: 'SELECT_SQUARE',
      data: square,
    })
  }

  renderSquare(square, index) {
    const x = square.position.x;
    const y = square.position.y;
    const cls = (x + y) % 2 === 1 ? 'dark' : 'light';

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
