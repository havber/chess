import React, { Component, PropTypes } from 'react';
import { ItemTypes } from '../../../Constants.js';
import Pawn from '../pieces/Pawn.jsx';
import { DropTarget } from 'react-dnd';
import {connect} from "react-redux";

function squareClick(e) {
  e.preventDefault();
}
const mapStateToProps = (state) => {
  return {
    pawns: state.pieces.filter( piece => {
      return piece.type === 'pawn';
    })
  }
};

const squareTarget = {
  drop(props) {
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

  getPieceAtPosition(x, y) {
    let pawn = {};
    this.props.pawns.forEach(p => {
      if (p.position[0] === x && p.position[1] === y) {
        pawn.element = (<Pawn item={p}/>);
        pawn.item = p;
      }
    });

    return pawn;
  }

  render () {
    const { x, y, connectDropTarget, isOver,  } = this.props;
    const piece = this.getPieceAtPosition(x, y);
    return connectDropTarget(
      <div
        style={{backgroundColor: isOver ? 'yellow' : 'transparent'}}
        className="clickTarget"
        onClick={squareClick}>
        {piece.element}
      </div>
    );
  }
}

Square.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  isOver: PropTypes.bool.isRequired
};

const BoardSquare = connect(
  mapStateToProps
)(Square);

export default DropTarget(ItemTypes.PAWN, squareTarget, collect)(BoardSquare);
