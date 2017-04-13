import React, { Component, PropTypes } from 'react';
import { ItemTypes } from '../../../Constants.js';
import { DropTarget } from 'react-dnd';
import {connect} from "react-redux";
import {getPieceAtPosition} from '../../../helpers/piece';

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
  }



  render () {
    const { x, y, connectDropTarget, isOver, square} = this.props;
    const piece = getPieceAtPosition(this.props.pieces, x, y);
    return connectDropTarget(
      <div
        style={{backgroundColor: isOver || square.selected ? 'yellow' : 'transparent'}}
        className="clickTarget"
        onClick={this.props.onClick}>
        {piece.element}
      </div>
    );
  }
}

Square.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  isOver: PropTypes.bool.isRequired,
  square: PropTypes.object.isRequired,
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
