import React, {Component, PropTypes} from 'react';
import {DragSource} from 'react-dnd';
import {ItemTypes} from '../../../Constants.js';
import {connect} from "react-redux";

const mapStateToProps = (state) => {
  return {...state};
};
const rookSource = {
  beginDrag(props) {
    return {...props};
  },

  endDrag(props, monitor, component) {
    if (monitor.didDrop) {
      const store = component.store;
      const result = monitor.getDropResult();
      store.dispatch({
        type: 'MOVE_ROOK',
        data: {
          position: [result.x, result.y],
          id: props.item.id
        }
      });
    }
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}

class Rook extends Component {

  componentDidMount() {
    const { connectDragPreview } = this.props;
    const img = new Image();
    img.src = this.props.item.color === 'black' ? 'http://localhost:8080/assets/br.svg' : 'http://localhost:8080/assets/wr.svg';
    img.onload = () => connectDragPreview(img);
  }


  render() {
    const { connectDragSource, isDragging, connectDragPreview } = this.props;
    const black = this.props.item.color === 'black';
    return connectDragPreview(
      <div className="rook" style={{backgroundColor: 'transparent'}}>
      {
        connectDragSource(
          <div style={{opacity: isDragging ? 0 : 1}}>
            <img src={'http://localhost:8080/assets/' + (black ? 'br.svg' : 'wr.svg')} height="65" width="65"/>
          </div>)
      }
      </div>
    );
  }
}

Rook.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
};

const RookPiece = connect(
  mapStateToProps
)(Rook);

export default DragSource(ItemTypes.ROOK, rookSource, collect)(RookPiece);
