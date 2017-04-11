import React, { Component, PropTypes } from 'react';
import { ItemTypes } from '../../../Constants.js';
import Pawn from '../pieces/Pawn.jsx';
import Rook from '../pieces/Rook.jsx';
import Knight from '../pieces/Knight.jsx';
import Bishop from '../pieces/Bishop.jsx';
import Queen from '../pieces/Queen.jsx';
import King from '../pieces/King.jsx';
import { DropTarget } from 'react-dnd';
import {connect} from "react-redux";

const mapStateToProps = (state) => {
  return {
    pieces: state.pieces,
  }
};

const squareTarget = {
  drop(props) {
    console.log(props);
    return {...props}
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  };
}

class Square extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selected: false,
    };
  }

  squareClick(e) {
    e.preventDefault();
    this.setState({
      selected: !this.state.selected
    })
  }

  getPieceAtPosition(x, y) {
    let piece = {};
    this.props.pieces.forEach(p => {
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

  render () {
    const { x, y, connectDropTarget, isOver, } = this.props;
    const piece = this.getPieceAtPosition(x, y);
    return connectDropTarget(
      <div
        style={{backgroundColor: isOver || this.state.selected ? 'yellow' : 'transparent'}}
        className="clickTarget"
        onClick={this.squareClick.bind(this)}>
        {piece.element}
      </div>
    );
  }
}

Square.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  isOver: PropTypes.bool.isRequired,
};

const BoardSquare = connect(
  mapStateToProps
)(Square);

export default DropTarget(
  [
    ItemTypes.PAWN,
    ItemTypes.ROOK,
    ItemTypes.KNIGHT,
    ItemTypes.BISHOP,
    ItemTypes.QUEEN,
    ItemTypes.KING,
  ], squareTarget, collect)(BoardSquare);
